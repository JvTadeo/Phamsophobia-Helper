import { CustomError } from "@/utils/customError";
import { Request, Response, NextFunction } from "express";
import { LanguageRepository } from "@/repository/language/language.repository";

const languageRepository = new LanguageRepository();

export async function languageMiddleware(req: Request, res: Response, next: NextFunction) {
    const { language_code } = req.headers as { language_code: string };

    if (language_code == undefined || language_code == '') {
        throw new CustomError('Missing languag code.', 400);
    }

    const language = await languageRepository.findFirst({
        where: {
            code: language_code
        },
        select: {
            id: true
        }
    })

    if (language == null) {
        throw new CustomError('Invalid language code.', 400);
    }

    req.state = { language: language.id };

    next();
}