export interface IGhost {
    id: string,
    name: string,
    sanity: IGenericValues,
    speed: IGenericValues,
    details: IDetails,
    custom: Array<ICustom>,
    evidences: Array<{
        name: string,
        icon: string    
    }>
}

// ----- Local Type
interface IGenericValues {
    min: number,
    normal: number,
    max: number
}

interface IDetails {
    tells: Array<string>,
    abilities: Array<string>
    behaviours: Array<string>
    hunt: Array<string>
}

interface ICustom {
    title: string,
    description: Array<string>;
    image?: string
}

// Tells, Behaviours, Abilities, Hunt Sanity, Evidence, Hunt Speed, Custom