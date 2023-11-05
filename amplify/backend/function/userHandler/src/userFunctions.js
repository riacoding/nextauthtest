const { signedRequest } = require("./appSyncCalls");

const getUser = /* GraphQL */ `
  query usersByEmail($email: AWSEmail!) {
    usersByEmail(email: $email) {
      items {
        id
        firstname
        lastname
        email
        sub
        legacy
        migrated
        entries {
          items {
            id
            title
            userEntriesId
          }
        }
      }
    }
  }
`;

const updateEntryMutation = /* GraphQL */ `
  mutation updateEntry($input: UpdateEntryInput!) {
    updateEntry(input: $input) {
      id
      title
      userEntriesId
      owner
    }
  }
`;

const updateUserMutation = /* GraphQL */ `
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      firstname
      lastname
      email
      sub
      createdAt
      updatedAt
      legacy
      migrated
      owner
      entries {
        items {
          id
          title
          issue
          region
          userEntriesId
        }
      }
    }
  }
`;

exports.lookupUser = async (email) => {
  console.log("looking up user:", email);
  try {
    const { data, errors } = await signedRequest(getUser, { email: email });
    console.log("return from appsync", data);
    const items = data["usersByEmail"].items;
    if (items.length > 0) {
      const user = items[0];
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

function createUpdateRequest(id, user) {
  const updateRequest = {
    input: {
      id,
      owner: `${user.sub}::${user.sub}`,
    },
  };
  return updateRequest;
}

async function migrateEntry(entryId, user) {
  const updateRequest = createUpdateRequest(entryId, user);
  try {
    const { data, errors } = await signedRequest(updateEntryMutation, updateRequest);
    console.log("data", data, errors);
    const updateEntry = data["updateEntry"];
    if (!errors) {
      return updateEntry;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateUser(user) {
  const updateRequest = {
    input: {
      id: user.id,
      migrated: true,
    },
  };

  try {
    const { data, errors } = await signedRequest(updateUserMutation, updateRequest);
    const updateUser = data["updateUser"];
    if (!errors) {
      return updateUser;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

exports.migrateUser = async (user) => {
  const entries = user?.entries?.items;
  if (entries && entries.length > 0) {
    const updatedEntries = await Promise.all(
      entries.map(async (entry) => {
        return await migrateEntry(entry.id, user);
      })
    );
    const updatedUser = await updateUser(user);
    console.log({ updatedEntries, updatedUser });
  }
};

exports.addUser = (user) => {};
