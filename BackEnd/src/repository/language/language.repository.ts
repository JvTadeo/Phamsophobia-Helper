import { ILanguage, LanguageType } from "./language.interface";
import { LanguagePrisma } from "./language.prisma";


export class LanguageRepository implements ILanguage {
    private languagePrisma: LanguagePrisma

    constructor() {
        this.languagePrisma = new LanguagePrisma();
    }

    findFirst(params: LanguageType["findFirst"]["params"]): Promise<LanguageType["findFirst"]["result"]> {
        return this.languagePrisma.findFirst(params);
    }
}