import { ContextProvider } from "aws-cdk-lib"
import { Event } from "aws-cdk-lib/aws-stepfunctions-tasks"

export const handler = (event: Event, context: ContextProvider) => {
    console.log({ event })
    return {
        statusCode: 200,
        body: "Success!!!"
    }
}