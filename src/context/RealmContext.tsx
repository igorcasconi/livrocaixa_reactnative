import React, { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react'
import Realm from 'realm'

import { FinancialMovementSchema, UserDataSchema } from '../core/database'
import { MovementPayloadProps, ReportListProps } from '../core/shared/movement'
import { getAllMovementsForExport, reducedMovementsByMonthOrYear, sortByDate } from '../core/utils/date'
import { TransactionProps } from '../features/Transactions/models/TransactionModel'

interface ContextProps {
  realm: Realm | null
  createUserFirebase: (uid: string) => void
  createFinancialMovement: (uid: string, payload: MovementPayloadProps) => void
  financialMovementList: (type: string, uid?: string | null) => TransactionProps[] | undefined
  deleteFinancialMovement: (index: number) => void
  getNextIndex: () => number | undefined
  getReportList: (uid?: string | null, isByMonth?: boolean) => ReportListProps[] | undefined
  getDataReportListForExcel: (dateFiltered: string, uid?: string | null, isByMonth?: boolean) => any[] | undefined
  isWritingOnlineData: boolean | null
  userFirebaseRegistered: (uid?: string | null) => boolean | undefined
}

const RealmContext = createContext<ContextProps>({} as ContextProps)

const RealmProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [realm, setRealm] = useState<Realm | null>(null)
  const [isWritingOnlineData, setWritingOnlineData] = useState<boolean | null>(null)

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

  const financialMovementList = (type: string, uid?: string | null): TransactionProps[] => {
    const movementList = realm?.objects('FinancialMovement').filtered(`userFirebase = "${uid}"`)
    const filterMovementList = movementList?.filtered(`type = "${type}"`)
    return sortByDate(filterMovementList?.toJSON() as TransactionProps[], true)
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

  const getReportList = (uid?: string | null, isByMonth?: boolean) => {
    const movements = realm?.objects('FinancialMovement').filtered(`userFirebase = "${uid}"`)
    const movementsReportList = reducedMovementsByMonthOrYear(movements?.toJSON(), isByMonth)
    return movementsReportList as ReportListProps[]
  }

  const getDataReportListForExcel = (dateFiltered: string, uid?: string | null, isByMonth?: boolean) => {
    const movements = realm
      ?.objects('FinancialMovement')
      .filtered(`userFirebase = "${uid}"`)
      .toJSON() as TransactionProps[]
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
        getReportList,
        getDataReportListForExcel,
        isWritingOnlineData,
        userFirebaseRegistered
      }}
    >
      {children}
    </RealmContext.Provider>
  )
}

const useRealm = () => useContext(RealmContext)

export { RealmProvider, useRealm }
