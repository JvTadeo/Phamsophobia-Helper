export { IFindOne }

type IFindOne<TModelWhere, TModelSelect, TResult> = {
    params: {
        where: TModelWhere,
        select: TModelSelect
    },
    result: Promise<TResult>
}