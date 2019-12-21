import * as dynamoDbLib from './libs/dynamodb-lib'
import { success, failure } from './libs/response-lib'

export async function main (event, context) {
  const data = JSON.parse(event.body)


  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: {"S": event.requestContext.identity.cognitoIdentityId},
      noteId: {"S": event.pathParameters.id}
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": {"S":data.attachment || null},
      ":content": {"S": data.content || null}
    },
    // Can also be ALL_OLD, UPDATED_OLD, UPDATED_NEW 
    // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html
    ReturnValues: "ALL_NEW"
  }
  try {
    await dynamoDbLib.call('update', params)
    return (success({ status:true }))
  } catch (e) {
    return failure({ status: false, params:JSON.stringify(params) })
  }
}
