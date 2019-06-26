import * as dbTypes from '../db'
import { status, adapterTypes } from '../constants'

interface RunResult {
  data: { result: string | null }
  error: boolean | null
  jobRunId: string
  taskRunId: string
  status: status
}

export interface IBridgeType
  extends Omit<dbTypes.BridgeType, 'incomingTokenHash' | 'salt'> {
  id: string
}

//REVIEW what to do with this?
export interface IExternalInitiator
  extends Omit<
    dbTypes.ExternalInitiator,
    'salt' | 'hashedSecret' | 'accessKey'
  > {}

export interface IInitiator extends dbTypes.Initiator {}

export interface IJobRun
  extends Omit<
    dbTypes.JobRun,
    'initiatorId' | 'overridesId' | 'jobSpecId' | 'resultId'
  > {
  initiator: IInitiator
  jobId: string
  overrides: RunResult
  result: RunResult
  taskRuns: ITaskRuns
  createdAt: string
}

export interface IJobSpec extends dbTypes.JobSpec {
  initiators: IInitiators
  tasks: ITaskSpecs
  runs: ITaskRuns
}

export interface ITaskRun
  extends Omit<dbTypes.TaskRun, 'taskSpecId' | 'jobRunId' | 'resultId'> {
    id: string
  result: RunResult
  task: ITaskSpec
  updatedAt: Date
  type: adapterTypes
  status: string
}

export interface ITaskSpec extends Omit<dbTypes.TaskSpec, 'jobSpecId'> {}

//REVIEW Not needed?
export interface ITxAttempt extends dbTypes.TxAttempt {}

export interface ITransaction
  extends Omit<dbTypes.Tx, 'surrogateId' | 'signedRawTx'> {
  rawHex: string
}

export type IBridgeTypes = Array<IBridgeType>
export type IExternalInitiators = Array<IExternalInitiator>
export type IInitiators = Array<IInitiator>
export type IJobRuns = Array<IJobRun>
export type IJobSpecs = Array<IJobSpec>
export type ITaskRuns = Array<ITaskRun>
export type ITaskSpecs = Array<ITaskSpec>
export type ITxAttempts = Array<ITxAttempt>
export type ITransactions = Array<ITransaction>
