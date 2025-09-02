import { IMediaTypeInterface, IMediaType } from "./media-type.interface";
import { MediaTypePrisma } from "./media-type.prisma";

export class MediaTypeRepository implements IMediaTypeInterface {
    private mediaTypePrisma : IMediaTypeInterface

    constructor() {
        this.mediaTypePrisma = new MediaTypePrisma();
    }

    async findMany(params: IMediaType["findMany"]["params"]): Promise<IMediaType["findMany"]["result"]> {
        return this.mediaTypePrisma.findMany(params);
    }
}