import React, { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react'
import Realm from 'realm'

import { TransactionSchema } from '../features/Transactions/models/schemas/TransactionSchema'
import { TransactionRepository } from '../features/Transactions/models/repositories/TransactionsRepository'
import { RealmTransactionRepository } from '../features/Transactions/infrastructure/RealmTransactionRepository'
import { HomeRepository } from '../features/Home/models/repositories/HomeRepository'
import { RealmHomeRepository } from '../features/Home/infrastructure/RealmHomeRepository'
import { RealmAuthRepository } from '../features/Auth/infrastructure/RealmAuthRepository'
import { AuthRepository } from '../features/Auth/models/repositories/AuthRepository'
import { AuthSchema } from '../features/Auth/models/schemas/AuthSchema'

interface DependenciesProps {
  realm: Realm | null
  transactionRepository: TransactionRepository
  homeRepository: HomeRepository
  authRepository: AuthRepository
}

const RealmContext = createContext<DependenciesProps>({} as DependenciesProps)

const RealmProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [realm, setRealm] = useState<Realm | null>(null)

  const dependencies = {
    transactionRepository: new RealmTransactionRepository(realm),
    homeRepository: new RealmHomeRepository(realm),
    authRepository: new RealmAuthRepository(realm)
  }

  useEffect(() => {
    const realmDB = new Realm({ schema: [TransactionSchema.schema, AuthSchema.schema], schemaVersion: 7 })
    setRealm(realmDB)
  }, [])

  return (
    <RealmContext.Provider
      value={{
        realm,
        ...dependencies
      }}
    >
      {children}
    </RealmContext.Provider>
  )
}

const useRealm = () => useContext(RealmContext)

export { RealmProvider, useRealm }
