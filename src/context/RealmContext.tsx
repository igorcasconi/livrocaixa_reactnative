import React, { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react'
import Realm from 'realm'

import { TransactionDataTableSchema, UserDataSchema } from '../core/database'

interface ContextProps {
  realm: Realm | null
}

const RealmContext = createContext<ContextProps>({} as ContextProps)

const RealmProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [realm, setRealm] = useState<Realm | null>(null)

  useEffect(() => {
    const realmDB = new Realm({ schema: [TransactionDataTableSchema, UserDataSchema], schemaVersion: 5 })
    setRealm(realmDB)
  }, [])

  return (
    <RealmContext.Provider
      value={{
        realm
      }}
    >
      {children}
    </RealmContext.Provider>
  )
}

const useRealm = () => useContext(RealmContext)

export { RealmProvider, useRealm }
