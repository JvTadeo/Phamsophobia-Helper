export interface IMediaTypeAccordion {
    mediaType: IMediaType,
    expanded: string | string[] | undefined,
    categoriesFiltered: IMediaCategory[],
}

// ---------- 

export interface IMediaType {
    id: string,
    name: string,
    categories: IMediaCategory[]
}

export interface IMediaCategory {
    name: string,
    duplicateRewardMoney: number,
    uniqueRewardMoney: number,
    duplicateRewardXp: number,
    uniqueRewardXp: number,
}