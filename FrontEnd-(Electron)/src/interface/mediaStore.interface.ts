export interface IMediaType {
    name: string,
    id: string,
    categories: IMediaCategory[]
}

export interface IMediaCategory {
    description: string,
    duplicateRewardMoney: number,
    uniqueRewardMoney: number,
    duplicateRewardXp: number,
    uniqueRewardXp: number,
}