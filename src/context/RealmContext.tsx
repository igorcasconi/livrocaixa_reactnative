import React, { createContext, useState, useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import Realm from 'realm'

import { FinancialMovementSchema, UserDataSchema } from '../database'
import { getAllMovements } from '../services/movimentacao'
import { MovementPayloadProps, MovementProps, ReportListProps } from '../shared/movement'
import { getAllMovementsForExport, reducedMovementsByMonthOrYear, sortByDate } from '../utils/date'
import { showToast } from '../utils/notification'
import { clearStorage, setStorage } from '../utils/storage'

interface ContextProps {
  realm: Realm | null
  createUserFirebase: (uid: string) => void
  createFinancialMovement: (uid: string, payload: MovementPayloadProps) => void
  financialMovementList: (type: string, uid?: string | null) => MovementProps[] | undefined
  deleteFinancialMovement: (index: number) => void
  getNextIndex: () => number | undefined
  getBalanceCash: (uid?: string | null) => number
  getReportList: (uid?: string | null, isByMonth?: boolean) => ReportListProps[] | undefined
  getDataReportListForExcel: (dateFiltered: string, uid?: string | null, isByMonth?: boolean) => any[] | undefined
  isWritingOnlineData: boolean | null
  getAllFinancialMovementsOnline: (uid?: string | null) => void
  userFirebaseRegistered: (uid?: string | null) => boolean | undefined
}

const RealmContext = createContext<ContextProps>({} as ContextProps)

const RealmProvider: React.FC = ({ children }) => {
  const [realm, setRealm] = useState<Realm | null>(null)
  const [isWritingOnlineData, setWritingOnlineData] = useState<boolean | null>(null)

  const { mutateAsync: getAllFinancialMovement } = useMutation(getAllMovements)

  useEffect(() => {
    const realmDB = new Realm({ schema: [FinancialMovementSchema, UserDataSchema], schemaVersion: 3 })
    setRealm(realmDB)
  }, [])

  const createUserFirebase = (uid: string) => {
    realm?.write(() => realm.create('UserData', { idFirebase: uid }))
  }

  const createFinancialMovement = (uid?: string | null, payload?: MovementPayloadProps) => {
    if (!uid || !payload) return

    return realm?.write(() =>
      realm.create('FinancialMovement', {
        userFirebase: uid,
        product: payload.product,
        value: payload.value,
        paymode: payload.paymode,
        date: payload.date,
        type: payload.type,
        index: payload.index
      })
    )
  }

  const financialMovementList = (type: string, uid?: string | null): MovementProps[] => {
    const movementList = realm?.objects('FinancialMovement').filtered(`userFirebase = "${uid}"`)
    const filterMovementList = movementList?.filtered(`type = "${type}"`)
    return sortByDate(filterMovementList?.toJSON() as MovementProps[], true)
  }

  const deleteFinancialMovement = (index: number) => {
    const movementList = realm?.objects('FinancialMovement')
    let filterMovementList = movementList?.filtered(`index = "${index}"`)
    realm?.write(() => realm.delete(filterMovementList))
    filterMovementList = undefined
  }

  const getNextIndex = () => {
    const movementList = realm?.objects('FinancialMovement')
    if (movementList?.length === 0) return 1

    const movementListLength = Number(movementList?.max('index'))
    return movementListLength + 1
  }

  const getAllFinancialMovementsOnline = async (uid?: string | null) => {
    if (!uid) return

    try {
      setWritingOnlineData(true)
      const dataFinancialMovement = await getAllFinancialMovement({ uid })
      realm?.write(() => {
        dataFinancialMovement?.data.map(movement => {
          const newIndex = getNextIndex()
          realm.create('FinancialMovement', {
            userFirebase: uid,
            product: movement.product,
            value: movement.value,
            paymode: movement.paymode,
            date: movement.date,
            type: movement.type,
            index: newIndex
          })
        })
        setWritingOnlineData(false)
        setStorage('@downloadedOnlineData', 'true')
      })
    } catch (err) {
      showToast('Ocorreu um erro ao baixar suas movimentações, feche o aplicativo e tente novamente!')
      setWritingOnlineData(false)
      console.log(err)
      clearStorage()
    }
  }

  const getBalanceCash = (uid?: string | null) => {
    const movements = realm?.objects('FinancialMovement').filtered(`userFirebase = "${uid}"`)
    const entriesValues = movements?.filtered('type = "Entries"').sum('value')
    const outflowsValues = movements?.filtered('type = "Outflows"').sum('value')
    const balanceCash = Number(entriesValues) - Number(outflowsValues)
    return balanceCash
  }

  const getReportList = (uid?: string | null, isByMonth?: boolean) => {
    const movements = realm?.objects('FinancialMovement').filtered(`userFirebase = "${uid}"`)
    const movementsReportList = reducedMovementsByMonthOrYear(movements?.toJSON(), isByMonth)
    return movementsReportList as ReportListProps[]
  }

  const getDataReportListForExcel = (dateFiltered: string, uid?: string | null, isByMonth?: boolean) => {
    const movements = realm
      ?.objects('FinancialMovement')
      .filtered(`userFirebase = "${uid}"`)
      .toJSON() as MovementProps[]
    const allMovementsReport = getAllMovementsForExport(movements, dateFiltered, isByMonth)
    return allMovementsReport
  }

  const userFirebaseRegistered = (uid?: string | null) => {
    const userData = realm?.objects('UserData').filtered(`idFirebase = "${uid}"`)
    return !!userData
  }

  return (
    <RealmContext.Provider
      value={{
        realm,
        createUserFirebase,
        createFinancialMovement,
        financialMovementList,
        deleteFinancialMovement,
        getNextIndex,
        getBalanceCash,
        getReportList,
        getDataReportListForExcel,
        isWritingOnlineData,
        getAllFinancialMovementsOnline,
        userFirebaseRegistered
      }}
    >
      {children}
    </RealmContext.Provider>
  )
}

const useRealm = () => useContext(RealmContext)

export { RealmProvider, useRealm }
