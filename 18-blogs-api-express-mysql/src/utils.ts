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
