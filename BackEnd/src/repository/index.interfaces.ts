export { IFindOne, IFindMany }

type IFindOne<TModelWhere, TModelSelect, TResult> = {
    params: {
        where: TModelWhere,
        select: TModelSelect
    },
    result: TResult
}

type IFindMany<TModel extends { where: any, select: any, include?: any }, TResult> = {
    params: {
        where?: TModel["where"],
        select?: TModel["select"],
        include?: TModel["include"]
    },
    result: TResult
}