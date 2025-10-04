export { IFindOne, IFindMany, IFindFirst }

type IFindOne<TModel extends { whereUnique: any, select: any, include?: any, result: any }> = {
    params: {
        where: TModel["whereUnique"],
        select?: TModel["select"],
        include?: TModel["include"]
    },
    result: TModel["result"] | null
}

type IFindMany<TModel extends { where: any, select: any, include?: any, result: any }> = {
    params: {
        where?: TModel["where"],
        select?: TModel["select"],
        include?: TModel["include"]
    },
    result: TModel["result"][]
}

type IFindFirst<TModel extends { where: any, select: any, include?: any, result: any }> = {
    params: {
        where?: TModel["where"],
        select?: TModel["select"],
        include?: TModel["include"]
    },
    result: TModel["result"] | null
}