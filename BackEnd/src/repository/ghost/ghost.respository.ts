import { GhostPrisma } from "./ghost.prisma";
import { IGhost, IGhostType } from "./ghost.interface";

export class GhostRepository implements IGhost {
    private ghostPrisma: GhostPrisma

    constructor() {
        this.ghostPrisma = new GhostPrisma();
    }

    findMany(params: IGhostType["findMany"]["params"]): Promise<IGhostType["findMany"]["result"]> {
        return this.ghostPrisma.findMany(params);
    }
    findOne(params: IGhostType["findOne"]["params"]): Promise<IGhostType["findOne"]["result"]> {
        return this.ghostPrisma.findOne(params);
    }
}