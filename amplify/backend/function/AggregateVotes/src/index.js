/* Amplify Params - DO NOT EDIT
	API_NEXTAUTHTEST_GRAPHQLAPIENDPOINTOUTPUT
	API_NEXTAUTHTEST_GRAPHQLAPIIDOUTPUT
	API_NEXTAUTHTEST_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");

exports.handler = async (event) => {
  const client = new DynamoDBClient({ region: process.env.REGION });
  const tableName = process.env.AGGREGATE_VOTES_TABLE;
  console.log("event", event, tableName);
  try {
    // Process each record in the event
    await Promise.all(
      event.Records.map(async (record) => {
        console.log("Processing record:", JSON.stringify(record));

        if (record.eventName !== "INSERT") {
          // Skip if not an INSERT event
          return;
        }

        const newImage = record.dynamodb.NewImage;
        const competitionId = newImage.competitionId.S;
        const entryId = newImage.entryId.S;

        // Combine competitionId and entryId to form the id
        const id = `${competitionId}#${entryId}`;

        const params = {
          TableName: tableName,
          Key: {
            id: { S: id },
          },
          UpdateExpression:
            "SET votes = if_not_exists(votes, :start) + :inc, competitionId = :compId, entryId = :entryId",
          ExpressionAttributeValues: {
            ":inc": { N: "1" },
            ":start": { N: "0" },
            ":compId": { S: competitionId },
            ":entryId": { S: entryId },
          },
          ReturnValues: "UPDATED_NEW",
        };

        await client.send(new UpdateItemCommand(params));
        console.log("Updated item:", id);
      })
    );

    return { statusCode: 200, body: "Processed successfully." };
  } catch (err) {
    console.error("Error processing records:", JSON.stringify(err, null, 2));
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};
