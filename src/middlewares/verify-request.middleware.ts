import { RequestValidation } from "../types/RequestValidation";
import { NextFunction, Request, Response } from "express";

type RequestValidationMap = {
  [key in keyof Required<RequestValidation>]: (
    req: Request,
    reqValidation: RequestValidation
  ) => any;
};

const requesValidations: RequestValidationMap = {
  /**
   * Verify payload of a rest service
   */
  payload(req: Request, reqValidation: RequestValidation) {
    return reqValidation.payload?.validate(req.body);
  },
  /**
   * Veirfy the parameters passed in the url
   */
  params(req: Request, reqValidation: RequestValidation) {
    return reqValidation.params?.validate(req.params);
  },
};

/**
 * Middleware to verify if the provided is information
 * in the middleware is valid
 */
export function verifyRequest(reqValidation: RequestValidation) {
  return (req: Request, res: Response, next: NextFunction) => {

    const validationKeys = Object.keys(
      reqValidation
    ) as (keyof RequestValidationMap)[];

    const errorsFound = validationKeys.map(
      (key: keyof RequestValidationMap) => ({
        key,
        result: requesValidations[key](req, reqValidation),
      })
    );

    const errorsObj = errorsFound.reduce((accumulator: any, {key, result}) => {
      if(result.error){
        accumulator.error[key] = result
      }
      return accumulator;
    },{ error: {}});

    if(Object.keys(errorsObj.error).length){
      res.status(400).send(errorsObj);
      return;
    }

    next();
  };
}
