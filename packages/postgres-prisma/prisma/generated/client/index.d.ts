
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model CryptoBalance
 * 
 */
export type CryptoBalance = $Result.DefaultSelection<Prisma.$CryptoBalancePayload>
/**
 * Model AccountBalance
 * 
 */
export type AccountBalance = $Result.DefaultSelection<Prisma.$AccountBalancePayload>
/**
 * Model Orders
 * 
 */
export type Orders = $Result.DefaultSelection<Prisma.$OrdersPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cryptoBalance`: Exposes CRUD operations for the **CryptoBalance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CryptoBalances
    * const cryptoBalances = await prisma.cryptoBalance.findMany()
    * ```
    */
  get cryptoBalance(): Prisma.CryptoBalanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.accountBalance`: Exposes CRUD operations for the **AccountBalance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccountBalances
    * const accountBalances = await prisma.accountBalance.findMany()
    * ```
    */
  get accountBalance(): Prisma.AccountBalanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orders`: Exposes CRUD operations for the **Orders** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.orders.findMany()
    * ```
    */
  get orders(): Prisma.OrdersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    CryptoBalance: 'CryptoBalance',
    AccountBalance: 'AccountBalance',
    Orders: 'Orders'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "cryptoBalance" | "accountBalance" | "orders"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      CryptoBalance: {
        payload: Prisma.$CryptoBalancePayload<ExtArgs>
        fields: Prisma.CryptoBalanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CryptoBalanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CryptoBalancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CryptoBalanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CryptoBalancePayload>
          }
          findFirst: {
            args: Prisma.CryptoBalanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CryptoBalancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CryptoBalanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CryptoBalancePayload>
          }
          findMany: {
            args: Prisma.CryptoBalanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CryptoBalancePayload>[]
          }
          create: {
            args: Prisma.CryptoBalanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CryptoBalancePayload>
          }
          createMany: {
            args: Prisma.CryptoBalanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CryptoBalanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CryptoBalancePayload>[]
          }
          delete: {
            args: Prisma.CryptoBalanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CryptoBalancePayload>
          }
          update: {
            args: Prisma.CryptoBalanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CryptoBalancePayload>
          }
          deleteMany: {
            args: Prisma.CryptoBalanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CryptoBalanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CryptoBalanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CryptoBalancePayload>[]
          }
          upsert: {
            args: Prisma.CryptoBalanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CryptoBalancePayload>
          }
          aggregate: {
            args: Prisma.CryptoBalanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCryptoBalance>
          }
          groupBy: {
            args: Prisma.CryptoBalanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<CryptoBalanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.CryptoBalanceCountArgs<ExtArgs>
            result: $Utils.Optional<CryptoBalanceCountAggregateOutputType> | number
          }
        }
      }
      AccountBalance: {
        payload: Prisma.$AccountBalancePayload<ExtArgs>
        fields: Prisma.AccountBalanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountBalanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountBalancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountBalanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountBalancePayload>
          }
          findFirst: {
            args: Prisma.AccountBalanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountBalancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountBalanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountBalancePayload>
          }
          findMany: {
            args: Prisma.AccountBalanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountBalancePayload>[]
          }
          create: {
            args: Prisma.AccountBalanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountBalancePayload>
          }
          createMany: {
            args: Prisma.AccountBalanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountBalanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountBalancePayload>[]
          }
          delete: {
            args: Prisma.AccountBalanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountBalancePayload>
          }
          update: {
            args: Prisma.AccountBalanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountBalancePayload>
          }
          deleteMany: {
            args: Prisma.AccountBalanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountBalanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountBalanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountBalancePayload>[]
          }
          upsert: {
            args: Prisma.AccountBalanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountBalancePayload>
          }
          aggregate: {
            args: Prisma.AccountBalanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccountBalance>
          }
          groupBy: {
            args: Prisma.AccountBalanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountBalanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountBalanceCountArgs<ExtArgs>
            result: $Utils.Optional<AccountBalanceCountAggregateOutputType> | number
          }
        }
      }
      Orders: {
        payload: Prisma.$OrdersPayload<ExtArgs>
        fields: Prisma.OrdersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrdersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrdersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdersPayload>
          }
          findFirst: {
            args: Prisma.OrdersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrdersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdersPayload>
          }
          findMany: {
            args: Prisma.OrdersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdersPayload>[]
          }
          create: {
            args: Prisma.OrdersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdersPayload>
          }
          createMany: {
            args: Prisma.OrdersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrdersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdersPayload>[]
          }
          delete: {
            args: Prisma.OrdersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdersPayload>
          }
          update: {
            args: Prisma.OrdersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdersPayload>
          }
          deleteMany: {
            args: Prisma.OrdersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrdersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrdersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdersPayload>[]
          }
          upsert: {
            args: Prisma.OrdersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrdersPayload>
          }
          aggregate: {
            args: Prisma.OrdersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrders>
          }
          groupBy: {
            args: Prisma.OrdersGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrdersGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrdersCountArgs<ExtArgs>
            result: $Utils.Optional<OrdersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    cryptoBalance?: CryptoBalanceOmit
    accountBalance?: AccountBalanceOmit
    orders?: OrdersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    cryptos: number
    accounts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cryptos?: boolean | UserCountOutputTypeCountCryptosArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCryptosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CryptoBalanceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountBalanceWhereInput
  }


  /**
   * Count Type AccountBalanceCountOutputType
   */

  export type AccountBalanceCountOutputType = {
    crypto: number
  }

  export type AccountBalanceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crypto?: boolean | AccountBalanceCountOutputTypeCountCryptoArgs
  }

  // Custom InputTypes
  /**
   * AccountBalanceCountOutputType without action
   */
  export type AccountBalanceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalanceCountOutputType
     */
    select?: AccountBalanceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountBalanceCountOutputType without action
   */
  export type AccountBalanceCountOutputTypeCountCryptoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CryptoBalanceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    email: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    email: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    email: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    email?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    email?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    email?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    password: string
    email: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    email?: boolean
    cryptos?: boolean | User$cryptosArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    email?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    email?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    email?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "email", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cryptos?: boolean | User$cryptosArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      cryptos: Prisma.$CryptoBalancePayload<ExtArgs>[]
      accounts: Prisma.$AccountBalancePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password: string
      email: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cryptos<T extends User$cryptosArgs<ExtArgs> = {}>(args?: Subset<T, User$cryptosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CryptoBalancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountBalancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.cryptos
   */
  export type User$cryptosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CryptoBalance
     */
    select?: CryptoBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CryptoBalance
     */
    omit?: CryptoBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CryptoBalanceInclude<ExtArgs> | null
    where?: CryptoBalanceWhereInput
    orderBy?: CryptoBalanceOrderByWithRelationInput | CryptoBalanceOrderByWithRelationInput[]
    cursor?: CryptoBalanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CryptoBalanceScalarFieldEnum | CryptoBalanceScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalance
     */
    select?: AccountBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountBalance
     */
    omit?: AccountBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountBalanceInclude<ExtArgs> | null
    where?: AccountBalanceWhereInput
    orderBy?: AccountBalanceOrderByWithRelationInput | AccountBalanceOrderByWithRelationInput[]
    cursor?: AccountBalanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountBalanceScalarFieldEnum | AccountBalanceScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model CryptoBalance
   */

  export type AggregateCryptoBalance = {
    _count: CryptoBalanceCountAggregateOutputType | null
    _avg: CryptoBalanceAvgAggregateOutputType | null
    _sum: CryptoBalanceSumAggregateOutputType | null
    _min: CryptoBalanceMinAggregateOutputType | null
    _max: CryptoBalanceMaxAggregateOutputType | null
  }

  export type CryptoBalanceAvgAggregateOutputType = {
    quantity: number | null
  }

  export type CryptoBalanceSumAggregateOutputType = {
    quantity: number | null
  }

  export type CryptoBalanceMinAggregateOutputType = {
    id: string | null
    asset: string | null
    quantity: number | null
    userId: string | null
    accountId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CryptoBalanceMaxAggregateOutputType = {
    id: string | null
    asset: string | null
    quantity: number | null
    userId: string | null
    accountId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CryptoBalanceCountAggregateOutputType = {
    id: number
    asset: number
    quantity: number
    userId: number
    accountId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CryptoBalanceAvgAggregateInputType = {
    quantity?: true
  }

  export type CryptoBalanceSumAggregateInputType = {
    quantity?: true
  }

  export type CryptoBalanceMinAggregateInputType = {
    id?: true
    asset?: true
    quantity?: true
    userId?: true
    accountId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CryptoBalanceMaxAggregateInputType = {
    id?: true
    asset?: true
    quantity?: true
    userId?: true
    accountId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CryptoBalanceCountAggregateInputType = {
    id?: true
    asset?: true
    quantity?: true
    userId?: true
    accountId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CryptoBalanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CryptoBalance to aggregate.
     */
    where?: CryptoBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CryptoBalances to fetch.
     */
    orderBy?: CryptoBalanceOrderByWithRelationInput | CryptoBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CryptoBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CryptoBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CryptoBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CryptoBalances
    **/
    _count?: true | CryptoBalanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CryptoBalanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CryptoBalanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CryptoBalanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CryptoBalanceMaxAggregateInputType
  }

  export type GetCryptoBalanceAggregateType<T extends CryptoBalanceAggregateArgs> = {
        [P in keyof T & keyof AggregateCryptoBalance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCryptoBalance[P]>
      : GetScalarType<T[P], AggregateCryptoBalance[P]>
  }




  export type CryptoBalanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CryptoBalanceWhereInput
    orderBy?: CryptoBalanceOrderByWithAggregationInput | CryptoBalanceOrderByWithAggregationInput[]
    by: CryptoBalanceScalarFieldEnum[] | CryptoBalanceScalarFieldEnum
    having?: CryptoBalanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CryptoBalanceCountAggregateInputType | true
    _avg?: CryptoBalanceAvgAggregateInputType
    _sum?: CryptoBalanceSumAggregateInputType
    _min?: CryptoBalanceMinAggregateInputType
    _max?: CryptoBalanceMaxAggregateInputType
  }

  export type CryptoBalanceGroupByOutputType = {
    id: string
    asset: string
    quantity: number
    userId: string
    accountId: string | null
    createdAt: Date
    updatedAt: Date
    _count: CryptoBalanceCountAggregateOutputType | null
    _avg: CryptoBalanceAvgAggregateOutputType | null
    _sum: CryptoBalanceSumAggregateOutputType | null
    _min: CryptoBalanceMinAggregateOutputType | null
    _max: CryptoBalanceMaxAggregateOutputType | null
  }

  type GetCryptoBalanceGroupByPayload<T extends CryptoBalanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CryptoBalanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CryptoBalanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CryptoBalanceGroupByOutputType[P]>
            : GetScalarType<T[P], CryptoBalanceGroupByOutputType[P]>
        }
      >
    >


  export type CryptoBalanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    asset?: boolean
    quantity?: boolean
    userId?: boolean
    accountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | CryptoBalance$accountArgs<ExtArgs>
  }, ExtArgs["result"]["cryptoBalance"]>

  export type CryptoBalanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    asset?: boolean
    quantity?: boolean
    userId?: boolean
    accountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | CryptoBalance$accountArgs<ExtArgs>
  }, ExtArgs["result"]["cryptoBalance"]>

  export type CryptoBalanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    asset?: boolean
    quantity?: boolean
    userId?: boolean
    accountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | CryptoBalance$accountArgs<ExtArgs>
  }, ExtArgs["result"]["cryptoBalance"]>

  export type CryptoBalanceSelectScalar = {
    id?: boolean
    asset?: boolean
    quantity?: boolean
    userId?: boolean
    accountId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CryptoBalanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "asset" | "quantity" | "userId" | "accountId" | "createdAt" | "updatedAt", ExtArgs["result"]["cryptoBalance"]>
  export type CryptoBalanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | CryptoBalance$accountArgs<ExtArgs>
  }
  export type CryptoBalanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | CryptoBalance$accountArgs<ExtArgs>
  }
  export type CryptoBalanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    account?: boolean | CryptoBalance$accountArgs<ExtArgs>
  }

  export type $CryptoBalancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CryptoBalance"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      account: Prisma.$AccountBalancePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      asset: string
      quantity: number
      userId: string
      accountId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cryptoBalance"]>
    composites: {}
  }

  type CryptoBalanceGetPayload<S extends boolean | null | undefined | CryptoBalanceDefaultArgs> = $Result.GetResult<Prisma.$CryptoBalancePayload, S>

  type CryptoBalanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CryptoBalanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CryptoBalanceCountAggregateInputType | true
    }

  export interface CryptoBalanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CryptoBalance'], meta: { name: 'CryptoBalance' } }
    /**
     * Find zero or one CryptoBalance that matches the filter.
     * @param {CryptoBalanceFindUniqueArgs} args - Arguments to find a CryptoBalance
     * @example
     * // Get one CryptoBalance
     * const cryptoBalance = await prisma.cryptoBalance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CryptoBalanceFindUniqueArgs>(args: SelectSubset<T, CryptoBalanceFindUniqueArgs<ExtArgs>>): Prisma__CryptoBalanceClient<$Result.GetResult<Prisma.$CryptoBalancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CryptoBalance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CryptoBalanceFindUniqueOrThrowArgs} args - Arguments to find a CryptoBalance
     * @example
     * // Get one CryptoBalance
     * const cryptoBalance = await prisma.cryptoBalance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CryptoBalanceFindUniqueOrThrowArgs>(args: SelectSubset<T, CryptoBalanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CryptoBalanceClient<$Result.GetResult<Prisma.$CryptoBalancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CryptoBalance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptoBalanceFindFirstArgs} args - Arguments to find a CryptoBalance
     * @example
     * // Get one CryptoBalance
     * const cryptoBalance = await prisma.cryptoBalance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CryptoBalanceFindFirstArgs>(args?: SelectSubset<T, CryptoBalanceFindFirstArgs<ExtArgs>>): Prisma__CryptoBalanceClient<$Result.GetResult<Prisma.$CryptoBalancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CryptoBalance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptoBalanceFindFirstOrThrowArgs} args - Arguments to find a CryptoBalance
     * @example
     * // Get one CryptoBalance
     * const cryptoBalance = await prisma.cryptoBalance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CryptoBalanceFindFirstOrThrowArgs>(args?: SelectSubset<T, CryptoBalanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__CryptoBalanceClient<$Result.GetResult<Prisma.$CryptoBalancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CryptoBalances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptoBalanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CryptoBalances
     * const cryptoBalances = await prisma.cryptoBalance.findMany()
     * 
     * // Get first 10 CryptoBalances
     * const cryptoBalances = await prisma.cryptoBalance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cryptoBalanceWithIdOnly = await prisma.cryptoBalance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CryptoBalanceFindManyArgs>(args?: SelectSubset<T, CryptoBalanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CryptoBalancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CryptoBalance.
     * @param {CryptoBalanceCreateArgs} args - Arguments to create a CryptoBalance.
     * @example
     * // Create one CryptoBalance
     * const CryptoBalance = await prisma.cryptoBalance.create({
     *   data: {
     *     // ... data to create a CryptoBalance
     *   }
     * })
     * 
     */
    create<T extends CryptoBalanceCreateArgs>(args: SelectSubset<T, CryptoBalanceCreateArgs<ExtArgs>>): Prisma__CryptoBalanceClient<$Result.GetResult<Prisma.$CryptoBalancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CryptoBalances.
     * @param {CryptoBalanceCreateManyArgs} args - Arguments to create many CryptoBalances.
     * @example
     * // Create many CryptoBalances
     * const cryptoBalance = await prisma.cryptoBalance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CryptoBalanceCreateManyArgs>(args?: SelectSubset<T, CryptoBalanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CryptoBalances and returns the data saved in the database.
     * @param {CryptoBalanceCreateManyAndReturnArgs} args - Arguments to create many CryptoBalances.
     * @example
     * // Create many CryptoBalances
     * const cryptoBalance = await prisma.cryptoBalance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CryptoBalances and only return the `id`
     * const cryptoBalanceWithIdOnly = await prisma.cryptoBalance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CryptoBalanceCreateManyAndReturnArgs>(args?: SelectSubset<T, CryptoBalanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CryptoBalancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CryptoBalance.
     * @param {CryptoBalanceDeleteArgs} args - Arguments to delete one CryptoBalance.
     * @example
     * // Delete one CryptoBalance
     * const CryptoBalance = await prisma.cryptoBalance.delete({
     *   where: {
     *     // ... filter to delete one CryptoBalance
     *   }
     * })
     * 
     */
    delete<T extends CryptoBalanceDeleteArgs>(args: SelectSubset<T, CryptoBalanceDeleteArgs<ExtArgs>>): Prisma__CryptoBalanceClient<$Result.GetResult<Prisma.$CryptoBalancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CryptoBalance.
     * @param {CryptoBalanceUpdateArgs} args - Arguments to update one CryptoBalance.
     * @example
     * // Update one CryptoBalance
     * const cryptoBalance = await prisma.cryptoBalance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CryptoBalanceUpdateArgs>(args: SelectSubset<T, CryptoBalanceUpdateArgs<ExtArgs>>): Prisma__CryptoBalanceClient<$Result.GetResult<Prisma.$CryptoBalancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CryptoBalances.
     * @param {CryptoBalanceDeleteManyArgs} args - Arguments to filter CryptoBalances to delete.
     * @example
     * // Delete a few CryptoBalances
     * const { count } = await prisma.cryptoBalance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CryptoBalanceDeleteManyArgs>(args?: SelectSubset<T, CryptoBalanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CryptoBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptoBalanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CryptoBalances
     * const cryptoBalance = await prisma.cryptoBalance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CryptoBalanceUpdateManyArgs>(args: SelectSubset<T, CryptoBalanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CryptoBalances and returns the data updated in the database.
     * @param {CryptoBalanceUpdateManyAndReturnArgs} args - Arguments to update many CryptoBalances.
     * @example
     * // Update many CryptoBalances
     * const cryptoBalance = await prisma.cryptoBalance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CryptoBalances and only return the `id`
     * const cryptoBalanceWithIdOnly = await prisma.cryptoBalance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CryptoBalanceUpdateManyAndReturnArgs>(args: SelectSubset<T, CryptoBalanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CryptoBalancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CryptoBalance.
     * @param {CryptoBalanceUpsertArgs} args - Arguments to update or create a CryptoBalance.
     * @example
     * // Update or create a CryptoBalance
     * const cryptoBalance = await prisma.cryptoBalance.upsert({
     *   create: {
     *     // ... data to create a CryptoBalance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CryptoBalance we want to update
     *   }
     * })
     */
    upsert<T extends CryptoBalanceUpsertArgs>(args: SelectSubset<T, CryptoBalanceUpsertArgs<ExtArgs>>): Prisma__CryptoBalanceClient<$Result.GetResult<Prisma.$CryptoBalancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CryptoBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptoBalanceCountArgs} args - Arguments to filter CryptoBalances to count.
     * @example
     * // Count the number of CryptoBalances
     * const count = await prisma.cryptoBalance.count({
     *   where: {
     *     // ... the filter for the CryptoBalances we want to count
     *   }
     * })
    **/
    count<T extends CryptoBalanceCountArgs>(
      args?: Subset<T, CryptoBalanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CryptoBalanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CryptoBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptoBalanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CryptoBalanceAggregateArgs>(args: Subset<T, CryptoBalanceAggregateArgs>): Prisma.PrismaPromise<GetCryptoBalanceAggregateType<T>>

    /**
     * Group by CryptoBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CryptoBalanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CryptoBalanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CryptoBalanceGroupByArgs['orderBy'] }
        : { orderBy?: CryptoBalanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CryptoBalanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCryptoBalanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CryptoBalance model
   */
  readonly fields: CryptoBalanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CryptoBalance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CryptoBalanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    account<T extends CryptoBalance$accountArgs<ExtArgs> = {}>(args?: Subset<T, CryptoBalance$accountArgs<ExtArgs>>): Prisma__AccountBalanceClient<$Result.GetResult<Prisma.$AccountBalancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CryptoBalance model
   */
  interface CryptoBalanceFieldRefs {
    readonly id: FieldRef<"CryptoBalance", 'String'>
    readonly asset: FieldRef<"CryptoBalance", 'String'>
    readonly quantity: FieldRef<"CryptoBalance", 'Int'>
    readonly userId: FieldRef<"CryptoBalance", 'String'>
    readonly accountId: FieldRef<"CryptoBalance", 'String'>
    readonly createdAt: FieldRef<"CryptoBalance", 'DateTime'>
    readonly updatedAt: FieldRef<"CryptoBalance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CryptoBalance findUnique
   */
  export type CryptoBalanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CryptoBalance
     */
    select?: CryptoBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CryptoBalance
     */
    omit?: CryptoBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CryptoBalanceInclude<ExtArgs> | null
    /**
     * Filter, which CryptoBalance to fetch.
     */
    where: CryptoBalanceWhereUniqueInput
  }

  /**
   * CryptoBalance findUniqueOrThrow
   */
  export type CryptoBalanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CryptoBalance
     */
    select?: CryptoBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CryptoBalance
     */
    omit?: CryptoBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CryptoBalanceInclude<ExtArgs> | null
    /**
     * Filter, which CryptoBalance to fetch.
     */
    where: CryptoBalanceWhereUniqueInput
  }

  /**
   * CryptoBalance findFirst
   */
  export type CryptoBalanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CryptoBalance
     */
    select?: CryptoBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CryptoBalance
     */
    omit?: CryptoBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CryptoBalanceInclude<ExtArgs> | null
    /**
     * Filter, which CryptoBalance to fetch.
     */
    where?: CryptoBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CryptoBalances to fetch.
     */
    orderBy?: CryptoBalanceOrderByWithRelationInput | CryptoBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CryptoBalances.
     */
    cursor?: CryptoBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CryptoBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CryptoBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CryptoBalances.
     */
    distinct?: CryptoBalanceScalarFieldEnum | CryptoBalanceScalarFieldEnum[]
  }

  /**
   * CryptoBalance findFirstOrThrow
   */
  export type CryptoBalanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CryptoBalance
     */
    select?: CryptoBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CryptoBalance
     */
    omit?: CryptoBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CryptoBalanceInclude<ExtArgs> | null
    /**
     * Filter, which CryptoBalance to fetch.
     */
    where?: CryptoBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CryptoBalances to fetch.
     */
    orderBy?: CryptoBalanceOrderByWithRelationInput | CryptoBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CryptoBalances.
     */
    cursor?: CryptoBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CryptoBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CryptoBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CryptoBalances.
     */
    distinct?: CryptoBalanceScalarFieldEnum | CryptoBalanceScalarFieldEnum[]
  }

  /**
   * CryptoBalance findMany
   */
  export type CryptoBalanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CryptoBalance
     */
    select?: CryptoBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CryptoBalance
     */
    omit?: CryptoBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CryptoBalanceInclude<ExtArgs> | null
    /**
     * Filter, which CryptoBalances to fetch.
     */
    where?: CryptoBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CryptoBalances to fetch.
     */
    orderBy?: CryptoBalanceOrderByWithRelationInput | CryptoBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CryptoBalances.
     */
    cursor?: CryptoBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CryptoBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CryptoBalances.
     */
    skip?: number
    distinct?: CryptoBalanceScalarFieldEnum | CryptoBalanceScalarFieldEnum[]
  }

  /**
   * CryptoBalance create
   */
  export type CryptoBalanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CryptoBalance
     */
    select?: CryptoBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CryptoBalance
     */
    omit?: CryptoBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CryptoBalanceInclude<ExtArgs> | null
    /**
     * The data needed to create a CryptoBalance.
     */
    data: XOR<CryptoBalanceCreateInput, CryptoBalanceUncheckedCreateInput>
  }

  /**
   * CryptoBalance createMany
   */
  export type CryptoBalanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CryptoBalances.
     */
    data: CryptoBalanceCreateManyInput | CryptoBalanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CryptoBalance createManyAndReturn
   */
  export type CryptoBalanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CryptoBalance
     */
    select?: CryptoBalanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CryptoBalance
     */
    omit?: CryptoBalanceOmit<ExtArgs> | null
    /**
     * The data used to create many CryptoBalances.
     */
    data: CryptoBalanceCreateManyInput | CryptoBalanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CryptoBalanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CryptoBalance update
   */
  export type CryptoBalanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CryptoBalance
     */
    select?: CryptoBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CryptoBalance
     */
    omit?: CryptoBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CryptoBalanceInclude<ExtArgs> | null
    /**
     * The data needed to update a CryptoBalance.
     */
    data: XOR<CryptoBalanceUpdateInput, CryptoBalanceUncheckedUpdateInput>
    /**
     * Choose, which CryptoBalance to update.
     */
    where: CryptoBalanceWhereUniqueInput
  }

  /**
   * CryptoBalance updateMany
   */
  export type CryptoBalanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CryptoBalances.
     */
    data: XOR<CryptoBalanceUpdateManyMutationInput, CryptoBalanceUncheckedUpdateManyInput>
    /**
     * Filter which CryptoBalances to update
     */
    where?: CryptoBalanceWhereInput
    /**
     * Limit how many CryptoBalances to update.
     */
    limit?: number
  }

  /**
   * CryptoBalance updateManyAndReturn
   */
  export type CryptoBalanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CryptoBalance
     */
    select?: CryptoBalanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CryptoBalance
     */
    omit?: CryptoBalanceOmit<ExtArgs> | null
    /**
     * The data used to update CryptoBalances.
     */
    data: XOR<CryptoBalanceUpdateManyMutationInput, CryptoBalanceUncheckedUpdateManyInput>
    /**
     * Filter which CryptoBalances to update
     */
    where?: CryptoBalanceWhereInput
    /**
     * Limit how many CryptoBalances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CryptoBalanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CryptoBalance upsert
   */
  export type CryptoBalanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CryptoBalance
     */
    select?: CryptoBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CryptoBalance
     */
    omit?: CryptoBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CryptoBalanceInclude<ExtArgs> | null
    /**
     * The filter to search for the CryptoBalance to update in case it exists.
     */
    where: CryptoBalanceWhereUniqueInput
    /**
     * In case the CryptoBalance found by the `where` argument doesn't exist, create a new CryptoBalance with this data.
     */
    create: XOR<CryptoBalanceCreateInput, CryptoBalanceUncheckedCreateInput>
    /**
     * In case the CryptoBalance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CryptoBalanceUpdateInput, CryptoBalanceUncheckedUpdateInput>
  }

  /**
   * CryptoBalance delete
   */
  export type CryptoBalanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CryptoBalance
     */
    select?: CryptoBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CryptoBalance
     */
    omit?: CryptoBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CryptoBalanceInclude<ExtArgs> | null
    /**
     * Filter which CryptoBalance to delete.
     */
    where: CryptoBalanceWhereUniqueInput
  }

  /**
   * CryptoBalance deleteMany
   */
  export type CryptoBalanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CryptoBalances to delete
     */
    where?: CryptoBalanceWhereInput
    /**
     * Limit how many CryptoBalances to delete.
     */
    limit?: number
  }

  /**
   * CryptoBalance.account
   */
  export type CryptoBalance$accountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalance
     */
    select?: AccountBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountBalance
     */
    omit?: AccountBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountBalanceInclude<ExtArgs> | null
    where?: AccountBalanceWhereInput
  }

  /**
   * CryptoBalance without action
   */
  export type CryptoBalanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CryptoBalance
     */
    select?: CryptoBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CryptoBalance
     */
    omit?: CryptoBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CryptoBalanceInclude<ExtArgs> | null
  }


  /**
   * Model AccountBalance
   */

  export type AggregateAccountBalance = {
    _count: AccountBalanceCountAggregateOutputType | null
    _avg: AccountBalanceAvgAggregateOutputType | null
    _sum: AccountBalanceSumAggregateOutputType | null
    _min: AccountBalanceMinAggregateOutputType | null
    _max: AccountBalanceMaxAggregateOutputType | null
  }

  export type AccountBalanceAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type AccountBalanceSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type AccountBalanceMinAggregateOutputType = {
    id: string | null
    amount: Decimal | null
    userId: string | null
  }

  export type AccountBalanceMaxAggregateOutputType = {
    id: string | null
    amount: Decimal | null
    userId: string | null
  }

  export type AccountBalanceCountAggregateOutputType = {
    id: number
    amount: number
    userId: number
    _all: number
  }


  export type AccountBalanceAvgAggregateInputType = {
    amount?: true
  }

  export type AccountBalanceSumAggregateInputType = {
    amount?: true
  }

  export type AccountBalanceMinAggregateInputType = {
    id?: true
    amount?: true
    userId?: true
  }

  export type AccountBalanceMaxAggregateInputType = {
    id?: true
    amount?: true
    userId?: true
  }

  export type AccountBalanceCountAggregateInputType = {
    id?: true
    amount?: true
    userId?: true
    _all?: true
  }

  export type AccountBalanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccountBalance to aggregate.
     */
    where?: AccountBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountBalances to fetch.
     */
    orderBy?: AccountBalanceOrderByWithRelationInput | AccountBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccountBalances
    **/
    _count?: true | AccountBalanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountBalanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountBalanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountBalanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountBalanceMaxAggregateInputType
  }

  export type GetAccountBalanceAggregateType<T extends AccountBalanceAggregateArgs> = {
        [P in keyof T & keyof AggregateAccountBalance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccountBalance[P]>
      : GetScalarType<T[P], AggregateAccountBalance[P]>
  }




  export type AccountBalanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountBalanceWhereInput
    orderBy?: AccountBalanceOrderByWithAggregationInput | AccountBalanceOrderByWithAggregationInput[]
    by: AccountBalanceScalarFieldEnum[] | AccountBalanceScalarFieldEnum
    having?: AccountBalanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountBalanceCountAggregateInputType | true
    _avg?: AccountBalanceAvgAggregateInputType
    _sum?: AccountBalanceSumAggregateInputType
    _min?: AccountBalanceMinAggregateInputType
    _max?: AccountBalanceMaxAggregateInputType
  }

  export type AccountBalanceGroupByOutputType = {
    id: string
    amount: Decimal
    userId: string
    _count: AccountBalanceCountAggregateOutputType | null
    _avg: AccountBalanceAvgAggregateOutputType | null
    _sum: AccountBalanceSumAggregateOutputType | null
    _min: AccountBalanceMinAggregateOutputType | null
    _max: AccountBalanceMaxAggregateOutputType | null
  }

  type GetAccountBalanceGroupByPayload<T extends AccountBalanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountBalanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountBalanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountBalanceGroupByOutputType[P]>
            : GetScalarType<T[P], AccountBalanceGroupByOutputType[P]>
        }
      >
    >


  export type AccountBalanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    userId?: boolean
    crypto?: boolean | AccountBalance$cryptoArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | AccountBalanceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accountBalance"]>

  export type AccountBalanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accountBalance"]>

  export type AccountBalanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["accountBalance"]>

  export type AccountBalanceSelectScalar = {
    id?: boolean
    amount?: boolean
    userId?: boolean
  }

  export type AccountBalanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "userId", ExtArgs["result"]["accountBalance"]>
  export type AccountBalanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crypto?: boolean | AccountBalance$cryptoArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | AccountBalanceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AccountBalanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountBalanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountBalancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AccountBalance"
    objects: {
      crypto: Prisma.$CryptoBalancePayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amount: Prisma.Decimal
      userId: string
    }, ExtArgs["result"]["accountBalance"]>
    composites: {}
  }

  type AccountBalanceGetPayload<S extends boolean | null | undefined | AccountBalanceDefaultArgs> = $Result.GetResult<Prisma.$AccountBalancePayload, S>

  type AccountBalanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountBalanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountBalanceCountAggregateInputType | true
    }

  export interface AccountBalanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AccountBalance'], meta: { name: 'AccountBalance' } }
    /**
     * Find zero or one AccountBalance that matches the filter.
     * @param {AccountBalanceFindUniqueArgs} args - Arguments to find a AccountBalance
     * @example
     * // Get one AccountBalance
     * const accountBalance = await prisma.accountBalance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountBalanceFindUniqueArgs>(args: SelectSubset<T, AccountBalanceFindUniqueArgs<ExtArgs>>): Prisma__AccountBalanceClient<$Result.GetResult<Prisma.$AccountBalancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AccountBalance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountBalanceFindUniqueOrThrowArgs} args - Arguments to find a AccountBalance
     * @example
     * // Get one AccountBalance
     * const accountBalance = await prisma.accountBalance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountBalanceFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountBalanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountBalanceClient<$Result.GetResult<Prisma.$AccountBalancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccountBalance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountBalanceFindFirstArgs} args - Arguments to find a AccountBalance
     * @example
     * // Get one AccountBalance
     * const accountBalance = await prisma.accountBalance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountBalanceFindFirstArgs>(args?: SelectSubset<T, AccountBalanceFindFirstArgs<ExtArgs>>): Prisma__AccountBalanceClient<$Result.GetResult<Prisma.$AccountBalancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccountBalance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountBalanceFindFirstOrThrowArgs} args - Arguments to find a AccountBalance
     * @example
     * // Get one AccountBalance
     * const accountBalance = await prisma.accountBalance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountBalanceFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountBalanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountBalanceClient<$Result.GetResult<Prisma.$AccountBalancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AccountBalances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountBalanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccountBalances
     * const accountBalances = await prisma.accountBalance.findMany()
     * 
     * // Get first 10 AccountBalances
     * const accountBalances = await prisma.accountBalance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountBalanceWithIdOnly = await prisma.accountBalance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountBalanceFindManyArgs>(args?: SelectSubset<T, AccountBalanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountBalancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AccountBalance.
     * @param {AccountBalanceCreateArgs} args - Arguments to create a AccountBalance.
     * @example
     * // Create one AccountBalance
     * const AccountBalance = await prisma.accountBalance.create({
     *   data: {
     *     // ... data to create a AccountBalance
     *   }
     * })
     * 
     */
    create<T extends AccountBalanceCreateArgs>(args: SelectSubset<T, AccountBalanceCreateArgs<ExtArgs>>): Prisma__AccountBalanceClient<$Result.GetResult<Prisma.$AccountBalancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AccountBalances.
     * @param {AccountBalanceCreateManyArgs} args - Arguments to create many AccountBalances.
     * @example
     * // Create many AccountBalances
     * const accountBalance = await prisma.accountBalance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountBalanceCreateManyArgs>(args?: SelectSubset<T, AccountBalanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AccountBalances and returns the data saved in the database.
     * @param {AccountBalanceCreateManyAndReturnArgs} args - Arguments to create many AccountBalances.
     * @example
     * // Create many AccountBalances
     * const accountBalance = await prisma.accountBalance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AccountBalances and only return the `id`
     * const accountBalanceWithIdOnly = await prisma.accountBalance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountBalanceCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountBalanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountBalancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AccountBalance.
     * @param {AccountBalanceDeleteArgs} args - Arguments to delete one AccountBalance.
     * @example
     * // Delete one AccountBalance
     * const AccountBalance = await prisma.accountBalance.delete({
     *   where: {
     *     // ... filter to delete one AccountBalance
     *   }
     * })
     * 
     */
    delete<T extends AccountBalanceDeleteArgs>(args: SelectSubset<T, AccountBalanceDeleteArgs<ExtArgs>>): Prisma__AccountBalanceClient<$Result.GetResult<Prisma.$AccountBalancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AccountBalance.
     * @param {AccountBalanceUpdateArgs} args - Arguments to update one AccountBalance.
     * @example
     * // Update one AccountBalance
     * const accountBalance = await prisma.accountBalance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountBalanceUpdateArgs>(args: SelectSubset<T, AccountBalanceUpdateArgs<ExtArgs>>): Prisma__AccountBalanceClient<$Result.GetResult<Prisma.$AccountBalancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AccountBalances.
     * @param {AccountBalanceDeleteManyArgs} args - Arguments to filter AccountBalances to delete.
     * @example
     * // Delete a few AccountBalances
     * const { count } = await prisma.accountBalance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountBalanceDeleteManyArgs>(args?: SelectSubset<T, AccountBalanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccountBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountBalanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccountBalances
     * const accountBalance = await prisma.accountBalance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountBalanceUpdateManyArgs>(args: SelectSubset<T, AccountBalanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccountBalances and returns the data updated in the database.
     * @param {AccountBalanceUpdateManyAndReturnArgs} args - Arguments to update many AccountBalances.
     * @example
     * // Update many AccountBalances
     * const accountBalance = await prisma.accountBalance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AccountBalances and only return the `id`
     * const accountBalanceWithIdOnly = await prisma.accountBalance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountBalanceUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountBalanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountBalancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AccountBalance.
     * @param {AccountBalanceUpsertArgs} args - Arguments to update or create a AccountBalance.
     * @example
     * // Update or create a AccountBalance
     * const accountBalance = await prisma.accountBalance.upsert({
     *   create: {
     *     // ... data to create a AccountBalance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccountBalance we want to update
     *   }
     * })
     */
    upsert<T extends AccountBalanceUpsertArgs>(args: SelectSubset<T, AccountBalanceUpsertArgs<ExtArgs>>): Prisma__AccountBalanceClient<$Result.GetResult<Prisma.$AccountBalancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AccountBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountBalanceCountArgs} args - Arguments to filter AccountBalances to count.
     * @example
     * // Count the number of AccountBalances
     * const count = await prisma.accountBalance.count({
     *   where: {
     *     // ... the filter for the AccountBalances we want to count
     *   }
     * })
    **/
    count<T extends AccountBalanceCountArgs>(
      args?: Subset<T, AccountBalanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountBalanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccountBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountBalanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountBalanceAggregateArgs>(args: Subset<T, AccountBalanceAggregateArgs>): Prisma.PrismaPromise<GetAccountBalanceAggregateType<T>>

    /**
     * Group by AccountBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountBalanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountBalanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountBalanceGroupByArgs['orderBy'] }
        : { orderBy?: AccountBalanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountBalanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountBalanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AccountBalance model
   */
  readonly fields: AccountBalanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AccountBalance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountBalanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    crypto<T extends AccountBalance$cryptoArgs<ExtArgs> = {}>(args?: Subset<T, AccountBalance$cryptoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CryptoBalancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AccountBalance model
   */
  interface AccountBalanceFieldRefs {
    readonly id: FieldRef<"AccountBalance", 'String'>
    readonly amount: FieldRef<"AccountBalance", 'Decimal'>
    readonly userId: FieldRef<"AccountBalance", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AccountBalance findUnique
   */
  export type AccountBalanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalance
     */
    select?: AccountBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountBalance
     */
    omit?: AccountBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountBalanceInclude<ExtArgs> | null
    /**
     * Filter, which AccountBalance to fetch.
     */
    where: AccountBalanceWhereUniqueInput
  }

  /**
   * AccountBalance findUniqueOrThrow
   */
  export type AccountBalanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalance
     */
    select?: AccountBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountBalance
     */
    omit?: AccountBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountBalanceInclude<ExtArgs> | null
    /**
     * Filter, which AccountBalance to fetch.
     */
    where: AccountBalanceWhereUniqueInput
  }

  /**
   * AccountBalance findFirst
   */
  export type AccountBalanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalance
     */
    select?: AccountBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountBalance
     */
    omit?: AccountBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountBalanceInclude<ExtArgs> | null
    /**
     * Filter, which AccountBalance to fetch.
     */
    where?: AccountBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountBalances to fetch.
     */
    orderBy?: AccountBalanceOrderByWithRelationInput | AccountBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountBalances.
     */
    cursor?: AccountBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountBalances.
     */
    distinct?: AccountBalanceScalarFieldEnum | AccountBalanceScalarFieldEnum[]
  }

  /**
   * AccountBalance findFirstOrThrow
   */
  export type AccountBalanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalance
     */
    select?: AccountBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountBalance
     */
    omit?: AccountBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountBalanceInclude<ExtArgs> | null
    /**
     * Filter, which AccountBalance to fetch.
     */
    where?: AccountBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountBalances to fetch.
     */
    orderBy?: AccountBalanceOrderByWithRelationInput | AccountBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountBalances.
     */
    cursor?: AccountBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountBalances.
     */
    distinct?: AccountBalanceScalarFieldEnum | AccountBalanceScalarFieldEnum[]
  }

  /**
   * AccountBalance findMany
   */
  export type AccountBalanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalance
     */
    select?: AccountBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountBalance
     */
    omit?: AccountBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountBalanceInclude<ExtArgs> | null
    /**
     * Filter, which AccountBalances to fetch.
     */
    where?: AccountBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountBalances to fetch.
     */
    orderBy?: AccountBalanceOrderByWithRelationInput | AccountBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccountBalances.
     */
    cursor?: AccountBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountBalances.
     */
    skip?: number
    distinct?: AccountBalanceScalarFieldEnum | AccountBalanceScalarFieldEnum[]
  }

  /**
   * AccountBalance create
   */
  export type AccountBalanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalance
     */
    select?: AccountBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountBalance
     */
    omit?: AccountBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountBalanceInclude<ExtArgs> | null
    /**
     * The data needed to create a AccountBalance.
     */
    data: XOR<AccountBalanceCreateInput, AccountBalanceUncheckedCreateInput>
  }

  /**
   * AccountBalance createMany
   */
  export type AccountBalanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AccountBalances.
     */
    data: AccountBalanceCreateManyInput | AccountBalanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AccountBalance createManyAndReturn
   */
  export type AccountBalanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalance
     */
    select?: AccountBalanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccountBalance
     */
    omit?: AccountBalanceOmit<ExtArgs> | null
    /**
     * The data used to create many AccountBalances.
     */
    data: AccountBalanceCreateManyInput | AccountBalanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountBalanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccountBalance update
   */
  export type AccountBalanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalance
     */
    select?: AccountBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountBalance
     */
    omit?: AccountBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountBalanceInclude<ExtArgs> | null
    /**
     * The data needed to update a AccountBalance.
     */
    data: XOR<AccountBalanceUpdateInput, AccountBalanceUncheckedUpdateInput>
    /**
     * Choose, which AccountBalance to update.
     */
    where: AccountBalanceWhereUniqueInput
  }

  /**
   * AccountBalance updateMany
   */
  export type AccountBalanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AccountBalances.
     */
    data: XOR<AccountBalanceUpdateManyMutationInput, AccountBalanceUncheckedUpdateManyInput>
    /**
     * Filter which AccountBalances to update
     */
    where?: AccountBalanceWhereInput
    /**
     * Limit how many AccountBalances to update.
     */
    limit?: number
  }

  /**
   * AccountBalance updateManyAndReturn
   */
  export type AccountBalanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalance
     */
    select?: AccountBalanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccountBalance
     */
    omit?: AccountBalanceOmit<ExtArgs> | null
    /**
     * The data used to update AccountBalances.
     */
    data: XOR<AccountBalanceUpdateManyMutationInput, AccountBalanceUncheckedUpdateManyInput>
    /**
     * Filter which AccountBalances to update
     */
    where?: AccountBalanceWhereInput
    /**
     * Limit how many AccountBalances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountBalanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccountBalance upsert
   */
  export type AccountBalanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalance
     */
    select?: AccountBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountBalance
     */
    omit?: AccountBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountBalanceInclude<ExtArgs> | null
    /**
     * The filter to search for the AccountBalance to update in case it exists.
     */
    where: AccountBalanceWhereUniqueInput
    /**
     * In case the AccountBalance found by the `where` argument doesn't exist, create a new AccountBalance with this data.
     */
    create: XOR<AccountBalanceCreateInput, AccountBalanceUncheckedCreateInput>
    /**
     * In case the AccountBalance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountBalanceUpdateInput, AccountBalanceUncheckedUpdateInput>
  }

  /**
   * AccountBalance delete
   */
  export type AccountBalanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalance
     */
    select?: AccountBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountBalance
     */
    omit?: AccountBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountBalanceInclude<ExtArgs> | null
    /**
     * Filter which AccountBalance to delete.
     */
    where: AccountBalanceWhereUniqueInput
  }

  /**
   * AccountBalance deleteMany
   */
  export type AccountBalanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccountBalances to delete
     */
    where?: AccountBalanceWhereInput
    /**
     * Limit how many AccountBalances to delete.
     */
    limit?: number
  }

  /**
   * AccountBalance.crypto
   */
  export type AccountBalance$cryptoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CryptoBalance
     */
    select?: CryptoBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CryptoBalance
     */
    omit?: CryptoBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CryptoBalanceInclude<ExtArgs> | null
    where?: CryptoBalanceWhereInput
    orderBy?: CryptoBalanceOrderByWithRelationInput | CryptoBalanceOrderByWithRelationInput[]
    cursor?: CryptoBalanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CryptoBalanceScalarFieldEnum | CryptoBalanceScalarFieldEnum[]
  }

  /**
   * AccountBalance without action
   */
  export type AccountBalanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountBalance
     */
    select?: AccountBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccountBalance
     */
    omit?: AccountBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountBalanceInclude<ExtArgs> | null
  }


  /**
   * Model Orders
   */

  export type AggregateOrders = {
    _count: OrdersCountAggregateOutputType | null
    _avg: OrdersAvgAggregateOutputType | null
    _sum: OrdersSumAggregateOutputType | null
    _min: OrdersMinAggregateOutputType | null
    _max: OrdersMaxAggregateOutputType | null
  }

  export type OrdersAvgAggregateOutputType = {
    price: Decimal | null
    quantity: Decimal | null
    filled: number | null
  }

  export type OrdersSumAggregateOutputType = {
    price: Decimal | null
    quantity: Decimal | null
    filled: number | null
  }

  export type OrdersMinAggregateOutputType = {
    id: string | null
    userId: string | null
    market: string | null
    side: string | null
    price: Decimal | null
    quantity: Decimal | null
    filled: number | null
    createdAt: Date | null
  }

  export type OrdersMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    market: string | null
    side: string | null
    price: Decimal | null
    quantity: Decimal | null
    filled: number | null
    createdAt: Date | null
  }

  export type OrdersCountAggregateOutputType = {
    id: number
    userId: number
    market: number
    side: number
    price: number
    quantity: number
    filled: number
    createdAt: number
    _all: number
  }


  export type OrdersAvgAggregateInputType = {
    price?: true
    quantity?: true
    filled?: true
  }

  export type OrdersSumAggregateInputType = {
    price?: true
    quantity?: true
    filled?: true
  }

  export type OrdersMinAggregateInputType = {
    id?: true
    userId?: true
    market?: true
    side?: true
    price?: true
    quantity?: true
    filled?: true
    createdAt?: true
  }

  export type OrdersMaxAggregateInputType = {
    id?: true
    userId?: true
    market?: true
    side?: true
    price?: true
    quantity?: true
    filled?: true
    createdAt?: true
  }

  export type OrdersCountAggregateInputType = {
    id?: true
    userId?: true
    market?: true
    side?: true
    price?: true
    quantity?: true
    filled?: true
    createdAt?: true
    _all?: true
  }

  export type OrdersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to aggregate.
     */
    where?: OrdersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrdersOrderByWithRelationInput | OrdersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrdersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrdersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrdersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrdersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrdersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrdersMaxAggregateInputType
  }

  export type GetOrdersAggregateType<T extends OrdersAggregateArgs> = {
        [P in keyof T & keyof AggregateOrders]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrders[P]>
      : GetScalarType<T[P], AggregateOrders[P]>
  }




  export type OrdersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrdersWhereInput
    orderBy?: OrdersOrderByWithAggregationInput | OrdersOrderByWithAggregationInput[]
    by: OrdersScalarFieldEnum[] | OrdersScalarFieldEnum
    having?: OrdersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrdersCountAggregateInputType | true
    _avg?: OrdersAvgAggregateInputType
    _sum?: OrdersSumAggregateInputType
    _min?: OrdersMinAggregateInputType
    _max?: OrdersMaxAggregateInputType
  }

  export type OrdersGroupByOutputType = {
    id: string
    userId: string
    market: string
    side: string
    price: Decimal
    quantity: Decimal
    filled: number
    createdAt: Date
    _count: OrdersCountAggregateOutputType | null
    _avg: OrdersAvgAggregateOutputType | null
    _sum: OrdersSumAggregateOutputType | null
    _min: OrdersMinAggregateOutputType | null
    _max: OrdersMaxAggregateOutputType | null
  }

  type GetOrdersGroupByPayload<T extends OrdersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrdersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrdersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrdersGroupByOutputType[P]>
            : GetScalarType<T[P], OrdersGroupByOutputType[P]>
        }
      >
    >


  export type OrdersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    market?: boolean
    side?: boolean
    price?: boolean
    quantity?: boolean
    filled?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["orders"]>

  export type OrdersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    market?: boolean
    side?: boolean
    price?: boolean
    quantity?: boolean
    filled?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["orders"]>

  export type OrdersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    market?: boolean
    side?: boolean
    price?: boolean
    quantity?: boolean
    filled?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["orders"]>

  export type OrdersSelectScalar = {
    id?: boolean
    userId?: boolean
    market?: boolean
    side?: boolean
    price?: boolean
    quantity?: boolean
    filled?: boolean
    createdAt?: boolean
  }

  export type OrdersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "market" | "side" | "price" | "quantity" | "filled" | "createdAt", ExtArgs["result"]["orders"]>

  export type $OrdersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Orders"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      market: string
      side: string
      price: Prisma.Decimal
      quantity: Prisma.Decimal
      filled: number
      createdAt: Date
    }, ExtArgs["result"]["orders"]>
    composites: {}
  }

  type OrdersGetPayload<S extends boolean | null | undefined | OrdersDefaultArgs> = $Result.GetResult<Prisma.$OrdersPayload, S>

  type OrdersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrdersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrdersCountAggregateInputType | true
    }

  export interface OrdersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Orders'], meta: { name: 'Orders' } }
    /**
     * Find zero or one Orders that matches the filter.
     * @param {OrdersFindUniqueArgs} args - Arguments to find a Orders
     * @example
     * // Get one Orders
     * const orders = await prisma.orders.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrdersFindUniqueArgs>(args: SelectSubset<T, OrdersFindUniqueArgs<ExtArgs>>): Prisma__OrdersClient<$Result.GetResult<Prisma.$OrdersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Orders that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrdersFindUniqueOrThrowArgs} args - Arguments to find a Orders
     * @example
     * // Get one Orders
     * const orders = await prisma.orders.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrdersFindUniqueOrThrowArgs>(args: SelectSubset<T, OrdersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrdersClient<$Result.GetResult<Prisma.$OrdersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrdersFindFirstArgs} args - Arguments to find a Orders
     * @example
     * // Get one Orders
     * const orders = await prisma.orders.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrdersFindFirstArgs>(args?: SelectSubset<T, OrdersFindFirstArgs<ExtArgs>>): Prisma__OrdersClient<$Result.GetResult<Prisma.$OrdersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Orders that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrdersFindFirstOrThrowArgs} args - Arguments to find a Orders
     * @example
     * // Get one Orders
     * const orders = await prisma.orders.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrdersFindFirstOrThrowArgs>(args?: SelectSubset<T, OrdersFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrdersClient<$Result.GetResult<Prisma.$OrdersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrdersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.orders.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.orders.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ordersWithIdOnly = await prisma.orders.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrdersFindManyArgs>(args?: SelectSubset<T, OrdersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrdersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Orders.
     * @param {OrdersCreateArgs} args - Arguments to create a Orders.
     * @example
     * // Create one Orders
     * const Orders = await prisma.orders.create({
     *   data: {
     *     // ... data to create a Orders
     *   }
     * })
     * 
     */
    create<T extends OrdersCreateArgs>(args: SelectSubset<T, OrdersCreateArgs<ExtArgs>>): Prisma__OrdersClient<$Result.GetResult<Prisma.$OrdersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrdersCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const orders = await prisma.orders.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrdersCreateManyArgs>(args?: SelectSubset<T, OrdersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrdersCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const orders = await prisma.orders.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const ordersWithIdOnly = await prisma.orders.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrdersCreateManyAndReturnArgs>(args?: SelectSubset<T, OrdersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrdersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Orders.
     * @param {OrdersDeleteArgs} args - Arguments to delete one Orders.
     * @example
     * // Delete one Orders
     * const Orders = await prisma.orders.delete({
     *   where: {
     *     // ... filter to delete one Orders
     *   }
     * })
     * 
     */
    delete<T extends OrdersDeleteArgs>(args: SelectSubset<T, OrdersDeleteArgs<ExtArgs>>): Prisma__OrdersClient<$Result.GetResult<Prisma.$OrdersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Orders.
     * @param {OrdersUpdateArgs} args - Arguments to update one Orders.
     * @example
     * // Update one Orders
     * const orders = await prisma.orders.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrdersUpdateArgs>(args: SelectSubset<T, OrdersUpdateArgs<ExtArgs>>): Prisma__OrdersClient<$Result.GetResult<Prisma.$OrdersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrdersDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.orders.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrdersDeleteManyArgs>(args?: SelectSubset<T, OrdersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrdersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const orders = await prisma.orders.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrdersUpdateManyArgs>(args: SelectSubset<T, OrdersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrdersUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const orders = await prisma.orders.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const ordersWithIdOnly = await prisma.orders.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrdersUpdateManyAndReturnArgs>(args: SelectSubset<T, OrdersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrdersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Orders.
     * @param {OrdersUpsertArgs} args - Arguments to update or create a Orders.
     * @example
     * // Update or create a Orders
     * const orders = await prisma.orders.upsert({
     *   create: {
     *     // ... data to create a Orders
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Orders we want to update
     *   }
     * })
     */
    upsert<T extends OrdersUpsertArgs>(args: SelectSubset<T, OrdersUpsertArgs<ExtArgs>>): Prisma__OrdersClient<$Result.GetResult<Prisma.$OrdersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrdersCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.orders.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrdersCountArgs>(
      args?: Subset<T, OrdersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrdersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrdersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrdersAggregateArgs>(args: Subset<T, OrdersAggregateArgs>): Prisma.PrismaPromise<GetOrdersAggregateType<T>>

    /**
     * Group by Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrdersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrdersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrdersGroupByArgs['orderBy'] }
        : { orderBy?: OrdersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrdersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrdersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Orders model
   */
  readonly fields: OrdersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Orders.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrdersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Orders model
   */
  interface OrdersFieldRefs {
    readonly id: FieldRef<"Orders", 'String'>
    readonly userId: FieldRef<"Orders", 'String'>
    readonly market: FieldRef<"Orders", 'String'>
    readonly side: FieldRef<"Orders", 'String'>
    readonly price: FieldRef<"Orders", 'Decimal'>
    readonly quantity: FieldRef<"Orders", 'Decimal'>
    readonly filled: FieldRef<"Orders", 'Int'>
    readonly createdAt: FieldRef<"Orders", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Orders findUnique
   */
  export type OrdersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orders
     */
    select?: OrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orders
     */
    omit?: OrdersOmit<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where: OrdersWhereUniqueInput
  }

  /**
   * Orders findUniqueOrThrow
   */
  export type OrdersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orders
     */
    select?: OrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orders
     */
    omit?: OrdersOmit<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where: OrdersWhereUniqueInput
  }

  /**
   * Orders findFirst
   */
  export type OrdersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orders
     */
    select?: OrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orders
     */
    omit?: OrdersOmit<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrdersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrdersOrderByWithRelationInput | OrdersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrdersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrdersScalarFieldEnum | OrdersScalarFieldEnum[]
  }

  /**
   * Orders findFirstOrThrow
   */
  export type OrdersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orders
     */
    select?: OrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orders
     */
    omit?: OrdersOmit<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrdersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrdersOrderByWithRelationInput | OrdersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrdersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrdersScalarFieldEnum | OrdersScalarFieldEnum[]
  }

  /**
   * Orders findMany
   */
  export type OrdersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orders
     */
    select?: OrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orders
     */
    omit?: OrdersOmit<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrdersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrdersOrderByWithRelationInput | OrdersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrdersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrdersScalarFieldEnum | OrdersScalarFieldEnum[]
  }

  /**
   * Orders create
   */
  export type OrdersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orders
     */
    select?: OrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orders
     */
    omit?: OrdersOmit<ExtArgs> | null
    /**
     * The data needed to create a Orders.
     */
    data: XOR<OrdersCreateInput, OrdersUncheckedCreateInput>
  }

  /**
   * Orders createMany
   */
  export type OrdersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrdersCreateManyInput | OrdersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Orders createManyAndReturn
   */
  export type OrdersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orders
     */
    select?: OrdersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Orders
     */
    omit?: OrdersOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrdersCreateManyInput | OrdersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Orders update
   */
  export type OrdersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orders
     */
    select?: OrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orders
     */
    omit?: OrdersOmit<ExtArgs> | null
    /**
     * The data needed to update a Orders.
     */
    data: XOR<OrdersUpdateInput, OrdersUncheckedUpdateInput>
    /**
     * Choose, which Orders to update.
     */
    where: OrdersWhereUniqueInput
  }

  /**
   * Orders updateMany
   */
  export type OrdersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrdersUpdateManyMutationInput, OrdersUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrdersWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Orders updateManyAndReturn
   */
  export type OrdersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orders
     */
    select?: OrdersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Orders
     */
    omit?: OrdersOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrdersUpdateManyMutationInput, OrdersUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrdersWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Orders upsert
   */
  export type OrdersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orders
     */
    select?: OrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orders
     */
    omit?: OrdersOmit<ExtArgs> | null
    /**
     * The filter to search for the Orders to update in case it exists.
     */
    where: OrdersWhereUniqueInput
    /**
     * In case the Orders found by the `where` argument doesn't exist, create a new Orders with this data.
     */
    create: XOR<OrdersCreateInput, OrdersUncheckedCreateInput>
    /**
     * In case the Orders was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrdersUpdateInput, OrdersUncheckedUpdateInput>
  }

  /**
   * Orders delete
   */
  export type OrdersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orders
     */
    select?: OrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orders
     */
    omit?: OrdersOmit<ExtArgs> | null
    /**
     * Filter which Orders to delete.
     */
    where: OrdersWhereUniqueInput
  }

  /**
   * Orders deleteMany
   */
  export type OrdersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrdersWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Orders without action
   */
  export type OrdersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orders
     */
    select?: OrdersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orders
     */
    omit?: OrdersOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    email: 'email'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CryptoBalanceScalarFieldEnum: {
    id: 'id',
    asset: 'asset',
    quantity: 'quantity',
    userId: 'userId',
    accountId: 'accountId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CryptoBalanceScalarFieldEnum = (typeof CryptoBalanceScalarFieldEnum)[keyof typeof CryptoBalanceScalarFieldEnum]


  export const AccountBalanceScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    userId: 'userId'
  };

  export type AccountBalanceScalarFieldEnum = (typeof AccountBalanceScalarFieldEnum)[keyof typeof AccountBalanceScalarFieldEnum]


  export const OrdersScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    market: 'market',
    side: 'side',
    price: 'price',
    quantity: 'quantity',
    filled: 'filled',
    createdAt: 'createdAt'
  };

  export type OrdersScalarFieldEnum = (typeof OrdersScalarFieldEnum)[keyof typeof OrdersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    cryptos?: CryptoBalanceListRelationFilter
    accounts?: AccountBalanceListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    cryptos?: CryptoBalanceOrderByRelationAggregateInput
    accounts?: AccountBalanceOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    cryptos?: CryptoBalanceListRelationFilter
    accounts?: AccountBalanceListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
  }

  export type CryptoBalanceWhereInput = {
    AND?: CryptoBalanceWhereInput | CryptoBalanceWhereInput[]
    OR?: CryptoBalanceWhereInput[]
    NOT?: CryptoBalanceWhereInput | CryptoBalanceWhereInput[]
    id?: StringFilter<"CryptoBalance"> | string
    asset?: StringFilter<"CryptoBalance"> | string
    quantity?: IntFilter<"CryptoBalance"> | number
    userId?: StringFilter<"CryptoBalance"> | string
    accountId?: StringNullableFilter<"CryptoBalance"> | string | null
    createdAt?: DateTimeFilter<"CryptoBalance"> | Date | string
    updatedAt?: DateTimeFilter<"CryptoBalance"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    account?: XOR<AccountBalanceNullableScalarRelationFilter, AccountBalanceWhereInput> | null
  }

  export type CryptoBalanceOrderByWithRelationInput = {
    id?: SortOrder
    asset?: SortOrder
    quantity?: SortOrder
    userId?: SortOrder
    accountId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    account?: AccountBalanceOrderByWithRelationInput
  }

  export type CryptoBalanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CryptoBalanceWhereInput | CryptoBalanceWhereInput[]
    OR?: CryptoBalanceWhereInput[]
    NOT?: CryptoBalanceWhereInput | CryptoBalanceWhereInput[]
    asset?: StringFilter<"CryptoBalance"> | string
    quantity?: IntFilter<"CryptoBalance"> | number
    userId?: StringFilter<"CryptoBalance"> | string
    accountId?: StringNullableFilter<"CryptoBalance"> | string | null
    createdAt?: DateTimeFilter<"CryptoBalance"> | Date | string
    updatedAt?: DateTimeFilter<"CryptoBalance"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    account?: XOR<AccountBalanceNullableScalarRelationFilter, AccountBalanceWhereInput> | null
  }, "id">

  export type CryptoBalanceOrderByWithAggregationInput = {
    id?: SortOrder
    asset?: SortOrder
    quantity?: SortOrder
    userId?: SortOrder
    accountId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CryptoBalanceCountOrderByAggregateInput
    _avg?: CryptoBalanceAvgOrderByAggregateInput
    _max?: CryptoBalanceMaxOrderByAggregateInput
    _min?: CryptoBalanceMinOrderByAggregateInput
    _sum?: CryptoBalanceSumOrderByAggregateInput
  }

  export type CryptoBalanceScalarWhereWithAggregatesInput = {
    AND?: CryptoBalanceScalarWhereWithAggregatesInput | CryptoBalanceScalarWhereWithAggregatesInput[]
    OR?: CryptoBalanceScalarWhereWithAggregatesInput[]
    NOT?: CryptoBalanceScalarWhereWithAggregatesInput | CryptoBalanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CryptoBalance"> | string
    asset?: StringWithAggregatesFilter<"CryptoBalance"> | string
    quantity?: IntWithAggregatesFilter<"CryptoBalance"> | number
    userId?: StringWithAggregatesFilter<"CryptoBalance"> | string
    accountId?: StringNullableWithAggregatesFilter<"CryptoBalance"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CryptoBalance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CryptoBalance"> | Date | string
  }

  export type AccountBalanceWhereInput = {
    AND?: AccountBalanceWhereInput | AccountBalanceWhereInput[]
    OR?: AccountBalanceWhereInput[]
    NOT?: AccountBalanceWhereInput | AccountBalanceWhereInput[]
    id?: StringFilter<"AccountBalance"> | string
    amount?: DecimalFilter<"AccountBalance"> | Decimal | DecimalJsLike | number | string
    userId?: StringFilter<"AccountBalance"> | string
    crypto?: CryptoBalanceListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountBalanceOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    crypto?: CryptoBalanceOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type AccountBalanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: AccountBalanceWhereInput | AccountBalanceWhereInput[]
    OR?: AccountBalanceWhereInput[]
    NOT?: AccountBalanceWhereInput | AccountBalanceWhereInput[]
    amount?: DecimalFilter<"AccountBalance"> | Decimal | DecimalJsLike | number | string
    crypto?: CryptoBalanceListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type AccountBalanceOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
    _count?: AccountBalanceCountOrderByAggregateInput
    _avg?: AccountBalanceAvgOrderByAggregateInput
    _max?: AccountBalanceMaxOrderByAggregateInput
    _min?: AccountBalanceMinOrderByAggregateInput
    _sum?: AccountBalanceSumOrderByAggregateInput
  }

  export type AccountBalanceScalarWhereWithAggregatesInput = {
    AND?: AccountBalanceScalarWhereWithAggregatesInput | AccountBalanceScalarWhereWithAggregatesInput[]
    OR?: AccountBalanceScalarWhereWithAggregatesInput[]
    NOT?: AccountBalanceScalarWhereWithAggregatesInput | AccountBalanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AccountBalance"> | string
    amount?: DecimalWithAggregatesFilter<"AccountBalance"> | Decimal | DecimalJsLike | number | string
    userId?: StringWithAggregatesFilter<"AccountBalance"> | string
  }

  export type OrdersWhereInput = {
    AND?: OrdersWhereInput | OrdersWhereInput[]
    OR?: OrdersWhereInput[]
    NOT?: OrdersWhereInput | OrdersWhereInput[]
    id?: StringFilter<"Orders"> | string
    userId?: StringFilter<"Orders"> | string
    market?: StringFilter<"Orders"> | string
    side?: StringFilter<"Orders"> | string
    price?: DecimalFilter<"Orders"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFilter<"Orders"> | Decimal | DecimalJsLike | number | string
    filled?: IntFilter<"Orders"> | number
    createdAt?: DateTimeFilter<"Orders"> | Date | string
  }

  export type OrdersOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    market?: SortOrder
    side?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    filled?: SortOrder
    createdAt?: SortOrder
  }

  export type OrdersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrdersWhereInput | OrdersWhereInput[]
    OR?: OrdersWhereInput[]
    NOT?: OrdersWhereInput | OrdersWhereInput[]
    userId?: StringFilter<"Orders"> | string
    market?: StringFilter<"Orders"> | string
    side?: StringFilter<"Orders"> | string
    price?: DecimalFilter<"Orders"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFilter<"Orders"> | Decimal | DecimalJsLike | number | string
    filled?: IntFilter<"Orders"> | number
    createdAt?: DateTimeFilter<"Orders"> | Date | string
  }, "id">

  export type OrdersOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    market?: SortOrder
    side?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    filled?: SortOrder
    createdAt?: SortOrder
    _count?: OrdersCountOrderByAggregateInput
    _avg?: OrdersAvgOrderByAggregateInput
    _max?: OrdersMaxOrderByAggregateInput
    _min?: OrdersMinOrderByAggregateInput
    _sum?: OrdersSumOrderByAggregateInput
  }

  export type OrdersScalarWhereWithAggregatesInput = {
    AND?: OrdersScalarWhereWithAggregatesInput | OrdersScalarWhereWithAggregatesInput[]
    OR?: OrdersScalarWhereWithAggregatesInput[]
    NOT?: OrdersScalarWhereWithAggregatesInput | OrdersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Orders"> | string
    userId?: StringWithAggregatesFilter<"Orders"> | string
    market?: StringWithAggregatesFilter<"Orders"> | string
    side?: StringWithAggregatesFilter<"Orders"> | string
    price?: DecimalWithAggregatesFilter<"Orders"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalWithAggregatesFilter<"Orders"> | Decimal | DecimalJsLike | number | string
    filled?: IntWithAggregatesFilter<"Orders"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Orders"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    password: string
    email: string
    cryptos?: CryptoBalanceCreateNestedManyWithoutUserInput
    accounts?: AccountBalanceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    password: string
    email: string
    cryptos?: CryptoBalanceUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountBalanceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cryptos?: CryptoBalanceUpdateManyWithoutUserNestedInput
    accounts?: AccountBalanceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cryptos?: CryptoBalanceUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountBalanceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    password: string
    email: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type CryptoBalanceCreateInput = {
    id?: string
    asset: string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCryptosInput
    account?: AccountBalanceCreateNestedOneWithoutCryptoInput
  }

  export type CryptoBalanceUncheckedCreateInput = {
    id?: string
    asset: string
    quantity: number
    userId: string
    accountId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CryptoBalanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCryptosNestedInput
    account?: AccountBalanceUpdateOneWithoutCryptoNestedInput
  }

  export type CryptoBalanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CryptoBalanceCreateManyInput = {
    id?: string
    asset: string
    quantity: number
    userId: string
    accountId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CryptoBalanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CryptoBalanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountBalanceCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    crypto?: CryptoBalanceCreateNestedManyWithoutAccountInput
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountBalanceUncheckedCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    userId: string
    crypto?: CryptoBalanceUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountBalanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    crypto?: CryptoBalanceUpdateManyWithoutAccountNestedInput
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountBalanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: StringFieldUpdateOperationsInput | string
    crypto?: CryptoBalanceUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountBalanceCreateManyInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    userId: string
  }

  export type AccountBalanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type AccountBalanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type OrdersCreateInput = {
    id?: string
    userId: string
    market: string
    side?: string
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    filled?: number
    createdAt?: Date | string
  }

  export type OrdersUncheckedCreateInput = {
    id?: string
    userId: string
    market: string
    side?: string
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    filled?: number
    createdAt?: Date | string
  }

  export type OrdersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    market?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    filled?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrdersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    market?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    filled?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrdersCreateManyInput = {
    id?: string
    userId: string
    market: string
    side?: string
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    filled?: number
    createdAt?: Date | string
  }

  export type OrdersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    market?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    filled?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrdersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    market?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    filled?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type CryptoBalanceListRelationFilter = {
    every?: CryptoBalanceWhereInput
    some?: CryptoBalanceWhereInput
    none?: CryptoBalanceWhereInput
  }

  export type AccountBalanceListRelationFilter = {
    every?: AccountBalanceWhereInput
    some?: AccountBalanceWhereInput
    none?: AccountBalanceWhereInput
  }

  export type CryptoBalanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountBalanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    email?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountBalanceNullableScalarRelationFilter = {
    is?: AccountBalanceWhereInput | null
    isNot?: AccountBalanceWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CryptoBalanceCountOrderByAggregateInput = {
    id?: SortOrder
    asset?: SortOrder
    quantity?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CryptoBalanceAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type CryptoBalanceMaxOrderByAggregateInput = {
    id?: SortOrder
    asset?: SortOrder
    quantity?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CryptoBalanceMinOrderByAggregateInput = {
    id?: SortOrder
    asset?: SortOrder
    quantity?: SortOrder
    userId?: SortOrder
    accountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CryptoBalanceSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type AccountBalanceCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
  }

  export type AccountBalanceAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type AccountBalanceMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
  }

  export type AccountBalanceMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
  }

  export type AccountBalanceSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type OrdersCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    market?: SortOrder
    side?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    filled?: SortOrder
    createdAt?: SortOrder
  }

  export type OrdersAvgOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
    filled?: SortOrder
  }

  export type OrdersMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    market?: SortOrder
    side?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    filled?: SortOrder
    createdAt?: SortOrder
  }

  export type OrdersMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    market?: SortOrder
    side?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    filled?: SortOrder
    createdAt?: SortOrder
  }

  export type OrdersSumOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
    filled?: SortOrder
  }

  export type CryptoBalanceCreateNestedManyWithoutUserInput = {
    create?: XOR<CryptoBalanceCreateWithoutUserInput, CryptoBalanceUncheckedCreateWithoutUserInput> | CryptoBalanceCreateWithoutUserInput[] | CryptoBalanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CryptoBalanceCreateOrConnectWithoutUserInput | CryptoBalanceCreateOrConnectWithoutUserInput[]
    createMany?: CryptoBalanceCreateManyUserInputEnvelope
    connect?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
  }

  export type AccountBalanceCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountBalanceCreateWithoutUserInput, AccountBalanceUncheckedCreateWithoutUserInput> | AccountBalanceCreateWithoutUserInput[] | AccountBalanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountBalanceCreateOrConnectWithoutUserInput | AccountBalanceCreateOrConnectWithoutUserInput[]
    createMany?: AccountBalanceCreateManyUserInputEnvelope
    connect?: AccountBalanceWhereUniqueInput | AccountBalanceWhereUniqueInput[]
  }

  export type CryptoBalanceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CryptoBalanceCreateWithoutUserInput, CryptoBalanceUncheckedCreateWithoutUserInput> | CryptoBalanceCreateWithoutUserInput[] | CryptoBalanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CryptoBalanceCreateOrConnectWithoutUserInput | CryptoBalanceCreateOrConnectWithoutUserInput[]
    createMany?: CryptoBalanceCreateManyUserInputEnvelope
    connect?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
  }

  export type AccountBalanceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountBalanceCreateWithoutUserInput, AccountBalanceUncheckedCreateWithoutUserInput> | AccountBalanceCreateWithoutUserInput[] | AccountBalanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountBalanceCreateOrConnectWithoutUserInput | AccountBalanceCreateOrConnectWithoutUserInput[]
    createMany?: AccountBalanceCreateManyUserInputEnvelope
    connect?: AccountBalanceWhereUniqueInput | AccountBalanceWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type CryptoBalanceUpdateManyWithoutUserNestedInput = {
    create?: XOR<CryptoBalanceCreateWithoutUserInput, CryptoBalanceUncheckedCreateWithoutUserInput> | CryptoBalanceCreateWithoutUserInput[] | CryptoBalanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CryptoBalanceCreateOrConnectWithoutUserInput | CryptoBalanceCreateOrConnectWithoutUserInput[]
    upsert?: CryptoBalanceUpsertWithWhereUniqueWithoutUserInput | CryptoBalanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CryptoBalanceCreateManyUserInputEnvelope
    set?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    disconnect?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    delete?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    connect?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    update?: CryptoBalanceUpdateWithWhereUniqueWithoutUserInput | CryptoBalanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CryptoBalanceUpdateManyWithWhereWithoutUserInput | CryptoBalanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CryptoBalanceScalarWhereInput | CryptoBalanceScalarWhereInput[]
  }

  export type AccountBalanceUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountBalanceCreateWithoutUserInput, AccountBalanceUncheckedCreateWithoutUserInput> | AccountBalanceCreateWithoutUserInput[] | AccountBalanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountBalanceCreateOrConnectWithoutUserInput | AccountBalanceCreateOrConnectWithoutUserInput[]
    upsert?: AccountBalanceUpsertWithWhereUniqueWithoutUserInput | AccountBalanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountBalanceCreateManyUserInputEnvelope
    set?: AccountBalanceWhereUniqueInput | AccountBalanceWhereUniqueInput[]
    disconnect?: AccountBalanceWhereUniqueInput | AccountBalanceWhereUniqueInput[]
    delete?: AccountBalanceWhereUniqueInput | AccountBalanceWhereUniqueInput[]
    connect?: AccountBalanceWhereUniqueInput | AccountBalanceWhereUniqueInput[]
    update?: AccountBalanceUpdateWithWhereUniqueWithoutUserInput | AccountBalanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountBalanceUpdateManyWithWhereWithoutUserInput | AccountBalanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountBalanceScalarWhereInput | AccountBalanceScalarWhereInput[]
  }

  export type CryptoBalanceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CryptoBalanceCreateWithoutUserInput, CryptoBalanceUncheckedCreateWithoutUserInput> | CryptoBalanceCreateWithoutUserInput[] | CryptoBalanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CryptoBalanceCreateOrConnectWithoutUserInput | CryptoBalanceCreateOrConnectWithoutUserInput[]
    upsert?: CryptoBalanceUpsertWithWhereUniqueWithoutUserInput | CryptoBalanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CryptoBalanceCreateManyUserInputEnvelope
    set?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    disconnect?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    delete?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    connect?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    update?: CryptoBalanceUpdateWithWhereUniqueWithoutUserInput | CryptoBalanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CryptoBalanceUpdateManyWithWhereWithoutUserInput | CryptoBalanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CryptoBalanceScalarWhereInput | CryptoBalanceScalarWhereInput[]
  }

  export type AccountBalanceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountBalanceCreateWithoutUserInput, AccountBalanceUncheckedCreateWithoutUserInput> | AccountBalanceCreateWithoutUserInput[] | AccountBalanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountBalanceCreateOrConnectWithoutUserInput | AccountBalanceCreateOrConnectWithoutUserInput[]
    upsert?: AccountBalanceUpsertWithWhereUniqueWithoutUserInput | AccountBalanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountBalanceCreateManyUserInputEnvelope
    set?: AccountBalanceWhereUniqueInput | AccountBalanceWhereUniqueInput[]
    disconnect?: AccountBalanceWhereUniqueInput | AccountBalanceWhereUniqueInput[]
    delete?: AccountBalanceWhereUniqueInput | AccountBalanceWhereUniqueInput[]
    connect?: AccountBalanceWhereUniqueInput | AccountBalanceWhereUniqueInput[]
    update?: AccountBalanceUpdateWithWhereUniqueWithoutUserInput | AccountBalanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountBalanceUpdateManyWithWhereWithoutUserInput | AccountBalanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountBalanceScalarWhereInput | AccountBalanceScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCryptosInput = {
    create?: XOR<UserCreateWithoutCryptosInput, UserUncheckedCreateWithoutCryptosInput>
    connectOrCreate?: UserCreateOrConnectWithoutCryptosInput
    connect?: UserWhereUniqueInput
  }

  export type AccountBalanceCreateNestedOneWithoutCryptoInput = {
    create?: XOR<AccountBalanceCreateWithoutCryptoInput, AccountBalanceUncheckedCreateWithoutCryptoInput>
    connectOrCreate?: AccountBalanceCreateOrConnectWithoutCryptoInput
    connect?: AccountBalanceWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutCryptosNestedInput = {
    create?: XOR<UserCreateWithoutCryptosInput, UserUncheckedCreateWithoutCryptosInput>
    connectOrCreate?: UserCreateOrConnectWithoutCryptosInput
    upsert?: UserUpsertWithoutCryptosInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCryptosInput, UserUpdateWithoutCryptosInput>, UserUncheckedUpdateWithoutCryptosInput>
  }

  export type AccountBalanceUpdateOneWithoutCryptoNestedInput = {
    create?: XOR<AccountBalanceCreateWithoutCryptoInput, AccountBalanceUncheckedCreateWithoutCryptoInput>
    connectOrCreate?: AccountBalanceCreateOrConnectWithoutCryptoInput
    upsert?: AccountBalanceUpsertWithoutCryptoInput
    disconnect?: AccountBalanceWhereInput | boolean
    delete?: AccountBalanceWhereInput | boolean
    connect?: AccountBalanceWhereUniqueInput
    update?: XOR<XOR<AccountBalanceUpdateToOneWithWhereWithoutCryptoInput, AccountBalanceUpdateWithoutCryptoInput>, AccountBalanceUncheckedUpdateWithoutCryptoInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CryptoBalanceCreateNestedManyWithoutAccountInput = {
    create?: XOR<CryptoBalanceCreateWithoutAccountInput, CryptoBalanceUncheckedCreateWithoutAccountInput> | CryptoBalanceCreateWithoutAccountInput[] | CryptoBalanceUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CryptoBalanceCreateOrConnectWithoutAccountInput | CryptoBalanceCreateOrConnectWithoutAccountInput[]
    createMany?: CryptoBalanceCreateManyAccountInputEnvelope
    connect?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type CryptoBalanceUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<CryptoBalanceCreateWithoutAccountInput, CryptoBalanceUncheckedCreateWithoutAccountInput> | CryptoBalanceCreateWithoutAccountInput[] | CryptoBalanceUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CryptoBalanceCreateOrConnectWithoutAccountInput | CryptoBalanceCreateOrConnectWithoutAccountInput[]
    createMany?: CryptoBalanceCreateManyAccountInputEnvelope
    connect?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type CryptoBalanceUpdateManyWithoutAccountNestedInput = {
    create?: XOR<CryptoBalanceCreateWithoutAccountInput, CryptoBalanceUncheckedCreateWithoutAccountInput> | CryptoBalanceCreateWithoutAccountInput[] | CryptoBalanceUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CryptoBalanceCreateOrConnectWithoutAccountInput | CryptoBalanceCreateOrConnectWithoutAccountInput[]
    upsert?: CryptoBalanceUpsertWithWhereUniqueWithoutAccountInput | CryptoBalanceUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: CryptoBalanceCreateManyAccountInputEnvelope
    set?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    disconnect?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    delete?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    connect?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    update?: CryptoBalanceUpdateWithWhereUniqueWithoutAccountInput | CryptoBalanceUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: CryptoBalanceUpdateManyWithWhereWithoutAccountInput | CryptoBalanceUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: CryptoBalanceScalarWhereInput | CryptoBalanceScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type CryptoBalanceUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<CryptoBalanceCreateWithoutAccountInput, CryptoBalanceUncheckedCreateWithoutAccountInput> | CryptoBalanceCreateWithoutAccountInput[] | CryptoBalanceUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: CryptoBalanceCreateOrConnectWithoutAccountInput | CryptoBalanceCreateOrConnectWithoutAccountInput[]
    upsert?: CryptoBalanceUpsertWithWhereUniqueWithoutAccountInput | CryptoBalanceUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: CryptoBalanceCreateManyAccountInputEnvelope
    set?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    disconnect?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    delete?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    connect?: CryptoBalanceWhereUniqueInput | CryptoBalanceWhereUniqueInput[]
    update?: CryptoBalanceUpdateWithWhereUniqueWithoutAccountInput | CryptoBalanceUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: CryptoBalanceUpdateManyWithWhereWithoutAccountInput | CryptoBalanceUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: CryptoBalanceScalarWhereInput | CryptoBalanceScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type CryptoBalanceCreateWithoutUserInput = {
    id?: string
    asset: string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
    account?: AccountBalanceCreateNestedOneWithoutCryptoInput
  }

  export type CryptoBalanceUncheckedCreateWithoutUserInput = {
    id?: string
    asset: string
    quantity: number
    accountId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CryptoBalanceCreateOrConnectWithoutUserInput = {
    where: CryptoBalanceWhereUniqueInput
    create: XOR<CryptoBalanceCreateWithoutUserInput, CryptoBalanceUncheckedCreateWithoutUserInput>
  }

  export type CryptoBalanceCreateManyUserInputEnvelope = {
    data: CryptoBalanceCreateManyUserInput | CryptoBalanceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountBalanceCreateWithoutUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    crypto?: CryptoBalanceCreateNestedManyWithoutAccountInput
  }

  export type AccountBalanceUncheckedCreateWithoutUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    crypto?: CryptoBalanceUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountBalanceCreateOrConnectWithoutUserInput = {
    where: AccountBalanceWhereUniqueInput
    create: XOR<AccountBalanceCreateWithoutUserInput, AccountBalanceUncheckedCreateWithoutUserInput>
  }

  export type AccountBalanceCreateManyUserInputEnvelope = {
    data: AccountBalanceCreateManyUserInput | AccountBalanceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CryptoBalanceUpsertWithWhereUniqueWithoutUserInput = {
    where: CryptoBalanceWhereUniqueInput
    update: XOR<CryptoBalanceUpdateWithoutUserInput, CryptoBalanceUncheckedUpdateWithoutUserInput>
    create: XOR<CryptoBalanceCreateWithoutUserInput, CryptoBalanceUncheckedCreateWithoutUserInput>
  }

  export type CryptoBalanceUpdateWithWhereUniqueWithoutUserInput = {
    where: CryptoBalanceWhereUniqueInput
    data: XOR<CryptoBalanceUpdateWithoutUserInput, CryptoBalanceUncheckedUpdateWithoutUserInput>
  }

  export type CryptoBalanceUpdateManyWithWhereWithoutUserInput = {
    where: CryptoBalanceScalarWhereInput
    data: XOR<CryptoBalanceUpdateManyMutationInput, CryptoBalanceUncheckedUpdateManyWithoutUserInput>
  }

  export type CryptoBalanceScalarWhereInput = {
    AND?: CryptoBalanceScalarWhereInput | CryptoBalanceScalarWhereInput[]
    OR?: CryptoBalanceScalarWhereInput[]
    NOT?: CryptoBalanceScalarWhereInput | CryptoBalanceScalarWhereInput[]
    id?: StringFilter<"CryptoBalance"> | string
    asset?: StringFilter<"CryptoBalance"> | string
    quantity?: IntFilter<"CryptoBalance"> | number
    userId?: StringFilter<"CryptoBalance"> | string
    accountId?: StringNullableFilter<"CryptoBalance"> | string | null
    createdAt?: DateTimeFilter<"CryptoBalance"> | Date | string
    updatedAt?: DateTimeFilter<"CryptoBalance"> | Date | string
  }

  export type AccountBalanceUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountBalanceWhereUniqueInput
    update: XOR<AccountBalanceUpdateWithoutUserInput, AccountBalanceUncheckedUpdateWithoutUserInput>
    create: XOR<AccountBalanceCreateWithoutUserInput, AccountBalanceUncheckedCreateWithoutUserInput>
  }

  export type AccountBalanceUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountBalanceWhereUniqueInput
    data: XOR<AccountBalanceUpdateWithoutUserInput, AccountBalanceUncheckedUpdateWithoutUserInput>
  }

  export type AccountBalanceUpdateManyWithWhereWithoutUserInput = {
    where: AccountBalanceScalarWhereInput
    data: XOR<AccountBalanceUpdateManyMutationInput, AccountBalanceUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountBalanceScalarWhereInput = {
    AND?: AccountBalanceScalarWhereInput | AccountBalanceScalarWhereInput[]
    OR?: AccountBalanceScalarWhereInput[]
    NOT?: AccountBalanceScalarWhereInput | AccountBalanceScalarWhereInput[]
    id?: StringFilter<"AccountBalance"> | string
    amount?: DecimalFilter<"AccountBalance"> | Decimal | DecimalJsLike | number | string
    userId?: StringFilter<"AccountBalance"> | string
  }

  export type UserCreateWithoutCryptosInput = {
    id?: string
    username: string
    password: string
    email: string
    accounts?: AccountBalanceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCryptosInput = {
    id?: string
    username: string
    password: string
    email: string
    accounts?: AccountBalanceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCryptosInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCryptosInput, UserUncheckedCreateWithoutCryptosInput>
  }

  export type AccountBalanceCreateWithoutCryptoInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountBalanceUncheckedCreateWithoutCryptoInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    userId: string
  }

  export type AccountBalanceCreateOrConnectWithoutCryptoInput = {
    where: AccountBalanceWhereUniqueInput
    create: XOR<AccountBalanceCreateWithoutCryptoInput, AccountBalanceUncheckedCreateWithoutCryptoInput>
  }

  export type UserUpsertWithoutCryptosInput = {
    update: XOR<UserUpdateWithoutCryptosInput, UserUncheckedUpdateWithoutCryptosInput>
    create: XOR<UserCreateWithoutCryptosInput, UserUncheckedCreateWithoutCryptosInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCryptosInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCryptosInput, UserUncheckedUpdateWithoutCryptosInput>
  }

  export type UserUpdateWithoutCryptosInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    accounts?: AccountBalanceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCryptosInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    accounts?: AccountBalanceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountBalanceUpsertWithoutCryptoInput = {
    update: XOR<AccountBalanceUpdateWithoutCryptoInput, AccountBalanceUncheckedUpdateWithoutCryptoInput>
    create: XOR<AccountBalanceCreateWithoutCryptoInput, AccountBalanceUncheckedCreateWithoutCryptoInput>
    where?: AccountBalanceWhereInput
  }

  export type AccountBalanceUpdateToOneWithWhereWithoutCryptoInput = {
    where?: AccountBalanceWhereInput
    data: XOR<AccountBalanceUpdateWithoutCryptoInput, AccountBalanceUncheckedUpdateWithoutCryptoInput>
  }

  export type AccountBalanceUpdateWithoutCryptoInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountBalanceUncheckedUpdateWithoutCryptoInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CryptoBalanceCreateWithoutAccountInput = {
    id?: string
    asset: string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCryptosInput
  }

  export type CryptoBalanceUncheckedCreateWithoutAccountInput = {
    id?: string
    asset: string
    quantity: number
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CryptoBalanceCreateOrConnectWithoutAccountInput = {
    where: CryptoBalanceWhereUniqueInput
    create: XOR<CryptoBalanceCreateWithoutAccountInput, CryptoBalanceUncheckedCreateWithoutAccountInput>
  }

  export type CryptoBalanceCreateManyAccountInputEnvelope = {
    data: CryptoBalanceCreateManyAccountInput | CryptoBalanceCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    username: string
    password: string
    email: string
    cryptos?: CryptoBalanceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    username: string
    password: string
    email: string
    cryptos?: CryptoBalanceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type CryptoBalanceUpsertWithWhereUniqueWithoutAccountInput = {
    where: CryptoBalanceWhereUniqueInput
    update: XOR<CryptoBalanceUpdateWithoutAccountInput, CryptoBalanceUncheckedUpdateWithoutAccountInput>
    create: XOR<CryptoBalanceCreateWithoutAccountInput, CryptoBalanceUncheckedCreateWithoutAccountInput>
  }

  export type CryptoBalanceUpdateWithWhereUniqueWithoutAccountInput = {
    where: CryptoBalanceWhereUniqueInput
    data: XOR<CryptoBalanceUpdateWithoutAccountInput, CryptoBalanceUncheckedUpdateWithoutAccountInput>
  }

  export type CryptoBalanceUpdateManyWithWhereWithoutAccountInput = {
    where: CryptoBalanceScalarWhereInput
    data: XOR<CryptoBalanceUpdateManyMutationInput, CryptoBalanceUncheckedUpdateManyWithoutAccountInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cryptos?: CryptoBalanceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cryptos?: CryptoBalanceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CryptoBalanceCreateManyUserInput = {
    id?: string
    asset: string
    quantity: number
    accountId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountBalanceCreateManyUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
  }

  export type CryptoBalanceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountBalanceUpdateOneWithoutCryptoNestedInput
  }

  export type CryptoBalanceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CryptoBalanceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountBalanceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    crypto?: CryptoBalanceUpdateManyWithoutAccountNestedInput
  }

  export type AccountBalanceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    crypto?: CryptoBalanceUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountBalanceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type CryptoBalanceCreateManyAccountInput = {
    id?: string
    asset: string
    quantity: number
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CryptoBalanceUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCryptosNestedInput
  }

  export type CryptoBalanceUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CryptoBalanceUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}