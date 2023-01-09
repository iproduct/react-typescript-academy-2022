import { OptionalUnlessRequiredId, WithId } from "mongodb";
import { identity } from "rxjs";
import { Identifiable, IdType } from "./dao/repository";

export const sendErrorResponse = function (req, res, status = 500, message, err = null) {
    if (req.get('env') === 'production') {
        err = undefined;
    }
    res.status(status).json({
        code: status,
        message,
        error: err
    })
}

export function replaceWithId<T extends Identifiable>(entity: WithId<T> | OptionalUnlessRequiredId<T>): T {
    const {_id, ...data} = entity;
    return {id: _id, ...data} as unknown as T;
}

export function replaceWith_id<T extends Identifiable>(dto: T): WithId<T> {
    const {id, ...data} = dto;
    return Object.assign({}, dto, { _id: id }) as unknown as WithId<T>;
}