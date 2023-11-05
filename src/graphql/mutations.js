/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const sendMessage = /* GraphQL */ `
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      recipient
      status
      error
      __typename
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      post {
        id
        title
        createdAt
        updatedAt
        blogPostsId
        __typename
      }
      content
      createdAt
      updatedAt
      postCommentsId
      __typename
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      post {
        id
        title
        createdAt
        updatedAt
        blogPostsId
        __typename
      }
      content
      createdAt
      updatedAt
      postCommentsId
      __typename
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      post {
        id
        title
        createdAt
        updatedAt
        blogPostsId
        __typename
      }
      content
      createdAt
      updatedAt
      postCommentsId
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      firstname
      lastname
      ssn
      email
      sub
      listings {
        nextToken
        __typename
      }
      entries {
        nextToken
        __typename
      }
      legacy
      migrated
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      firstname
      lastname
      ssn
      email
      sub
      listings {
        nextToken
        __typename
      }
      entries {
        nextToken
        __typename
      }
      legacy
      migrated
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      firstname
      lastname
      ssn
      email
      sub
      listings {
        nextToken
        __typename
      }
      entries {
        nextToken
        __typename
      }
      legacy
      migrated
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createIssue = /* GraphQL */ `
  mutation CreateIssue(
    $input: CreateIssueInput!
    $condition: ModelIssueConditionInput
  ) {
    createIssue(input: $input, condition: $condition) {
      id
      type
      issue_id
      number
      date
      name
      release_date
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateIssue = /* GraphQL */ `
  mutation UpdateIssue(
    $input: UpdateIssueInput!
    $condition: ModelIssueConditionInput
  ) {
    updateIssue(input: $input, condition: $condition) {
      id
      type
      issue_id
      number
      date
      name
      release_date
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteIssue = /* GraphQL */ `
  mutation DeleteIssue(
    $input: DeleteIssueInput!
    $condition: ModelIssueConditionInput
  ) {
    deleteIssue(input: $input, condition: $condition) {
      id
      type
      issue_id
      number
      date
      name
      release_date
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCalendarListing = /* GraphQL */ `
  mutation CreateCalendarListing(
    $input: CreateCalendarListingInput!
    $condition: ModelCalendarListingConditionInput
  ) {
    createCalendarListing(input: $input, condition: $condition) {
      id
      user {
        id
        firstname
        lastname
        ssn
        email
        sub
        legacy
        migrated
        owner
        createdAt
        updatedAt
        __typename
      }
      title
      body
      city
      state
      gallery
      approval
      isPublished
      publishDate
      eventDate
      teardownDate
      createdAt
      updatedAt
      userListingsId
      owner
      __typename
    }
  }
`;
export const updateCalendarListing = /* GraphQL */ `
  mutation UpdateCalendarListing(
    $input: UpdateCalendarListingInput!
    $condition: ModelCalendarListingConditionInput
  ) {
    updateCalendarListing(input: $input, condition: $condition) {
      id
      user {
        id
        firstname
        lastname
        ssn
        email
        sub
        legacy
        migrated
        owner
        createdAt
        updatedAt
        __typename
      }
      title
      body
      city
      state
      gallery
      approval
      isPublished
      publishDate
      eventDate
      teardownDate
      createdAt
      updatedAt
      userListingsId
      owner
      __typename
    }
  }
`;
export const deleteCalendarListing = /* GraphQL */ `
  mutation DeleteCalendarListing(
    $input: DeleteCalendarListingInput!
    $condition: ModelCalendarListingConditionInput
  ) {
    deleteCalendarListing(input: $input, condition: $condition) {
      id
      user {
        id
        firstname
        lastname
        ssn
        email
        sub
        legacy
        migrated
        owner
        createdAt
        updatedAt
        __typename
      }
      title
      body
      city
      state
      gallery
      approval
      isPublished
      publishDate
      eventDate
      teardownDate
      createdAt
      updatedAt
      userListingsId
      owner
      __typename
    }
  }
`;
export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
      id
      name
      posts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
      id
      name
      posts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
      id
      name
      posts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      title
      blog {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      blogPostsId
      __typename
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      blog {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      blogPostsId
      __typename
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      blog {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      blogPostsId
      __typename
    }
  }
`;
export const createEntry = /* GraphQL */ `
  mutation CreateEntry(
    $input: CreateEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    createEntry(input: $input, condition: $condition) {
      id
      title
      issue
      region
      userEntriesId
      user {
        id
        firstname
        lastname
        ssn
        email
        sub
        legacy
        migrated
        owner
        createdAt
        updatedAt
        __typename
      }
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEntry = /* GraphQL */ `
  mutation UpdateEntry(
    $input: UpdateEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    updateEntry(input: $input, condition: $condition) {
      id
      title
      issue
      region
      userEntriesId
      user {
        id
        firstname
        lastname
        ssn
        email
        sub
        legacy
        migrated
        owner
        createdAt
        updatedAt
        __typename
      }
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEntry = /* GraphQL */ `
  mutation DeleteEntry(
    $input: DeleteEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    deleteEntry(input: $input, condition: $condition) {
      id
      title
      issue
      region
      userEntriesId
      user {
        id
        firstname
        lastname
        ssn
        email
        sub
        legacy
        migrated
        owner
        createdAt
        updatedAt
        __typename
      }
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      senderEmail
      firstname
      lastname
      senderId
      recipients
      recipientId
      threadId
      type
      isRead
      moderation
      moderationId
      moderationType
      isModeration
      subject
      body
      isStarred
      labels
      folder
      replies
      cc
      attatchments
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      senderEmail
      firstname
      lastname
      senderId
      recipients
      recipientId
      threadId
      type
      isRead
      moderation
      moderationId
      moderationType
      isModeration
      subject
      body
      isStarred
      labels
      folder
      replies
      cc
      attatchments
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      senderEmail
      firstname
      lastname
      senderId
      recipients
      recipientId
      threadId
      type
      isRead
      moderation
      moderationId
      moderationType
      isModeration
      subject
      body
      isStarred
      labels
      folder
      replies
      cc
      attatchments
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createVoteAggregates = /* GraphQL */ `
  mutation CreateVoteAggregates(
    $input: CreateVoteAggregatesInput!
    $condition: ModelVoteAggregatesConditionInput
  ) {
    createVoteAggregates(input: $input, condition: $condition) {
      id
      competitionId
      entryId
      votes
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateVoteAggregates = /* GraphQL */ `
  mutation UpdateVoteAggregates(
    $input: UpdateVoteAggregatesInput!
    $condition: ModelVoteAggregatesConditionInput
  ) {
    updateVoteAggregates(input: $input, condition: $condition) {
      id
      competitionId
      entryId
      votes
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteVoteAggregates = /* GraphQL */ `
  mutation DeleteVoteAggregates(
    $input: DeleteVoteAggregatesInput!
    $condition: ModelVoteAggregatesConditionInput
  ) {
    deleteVoteAggregates(input: $input, condition: $condition) {
      id
      competitionId
      entryId
      votes
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createVote = /* GraphQL */ `
  mutation CreateVote(
    $input: CreateVoteInput!
    $condition: ModelVoteConditionInput
  ) {
    createVote(input: $input, condition: $condition) {
      id
      competitionId
      entryId
      userId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateVote = /* GraphQL */ `
  mutation UpdateVote(
    $input: UpdateVoteInput!
    $condition: ModelVoteConditionInput
  ) {
    updateVote(input: $input, condition: $condition) {
      id
      competitionId
      entryId
      userId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteVote = /* GraphQL */ `
  mutation DeleteVote(
    $input: DeleteVoteInput!
    $condition: ModelVoteConditionInput
  ) {
    deleteVote(input: $input, condition: $condition) {
      id
      competitionId
      entryId
      userId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
