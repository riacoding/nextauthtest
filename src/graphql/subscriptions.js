/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateIssue = /* GraphQL */ `
  subscription OnCreateIssue($filter: ModelSubscriptionIssueFilterInput) {
    onCreateIssue(filter: $filter) {
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
export const onUpdateIssue = /* GraphQL */ `
  subscription OnUpdateIssue($filter: ModelSubscriptionIssueFilterInput) {
    onUpdateIssue(filter: $filter) {
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
export const onDeleteIssue = /* GraphQL */ `
  subscription OnDeleteIssue($filter: ModelSubscriptionIssueFilterInput) {
    onDeleteIssue(filter: $filter) {
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
export const onCreateCalendarListing = /* GraphQL */ `
  subscription OnCreateCalendarListing(
    $filter: ModelSubscriptionCalendarListingFilterInput
    $owner: String
  ) {
    onCreateCalendarListing(filter: $filter, owner: $owner) {
      id
      user {
        id
        firstname
        lastname
        ssn
        email
        sub
        createdAt
        updatedAt
        owner
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
export const onUpdateCalendarListing = /* GraphQL */ `
  subscription OnUpdateCalendarListing(
    $filter: ModelSubscriptionCalendarListingFilterInput
    $owner: String
  ) {
    onUpdateCalendarListing(filter: $filter, owner: $owner) {
      id
      user {
        id
        firstname
        lastname
        ssn
        email
        sub
        createdAt
        updatedAt
        owner
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
export const onDeleteCalendarListing = /* GraphQL */ `
  subscription OnDeleteCalendarListing(
    $filter: ModelSubscriptionCalendarListingFilterInput
    $owner: String
  ) {
    onDeleteCalendarListing(filter: $filter, owner: $owner) {
      id
      user {
        id
        firstname
        lastname
        ssn
        email
        sub
        createdAt
        updatedAt
        owner
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
export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog($filter: ModelSubscriptionBlogFilterInput) {
    onCreateBlog(filter: $filter) {
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
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog($filter: ModelSubscriptionBlogFilterInput) {
    onUpdateBlog(filter: $filter) {
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
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog($filter: ModelSubscriptionBlogFilterInput) {
    onDeleteBlog(filter: $filter) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onCreateMessage(filter: $filter, owner: $owner) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onUpdateMessage(filter: $filter, owner: $owner) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onDeleteMessage(filter: $filter, owner: $owner) {
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
export const onCreateVoteAggregates = /* GraphQL */ `
  subscription OnCreateVoteAggregates(
    $filter: ModelSubscriptionVoteAggregatesFilterInput
    $owner: String
  ) {
    onCreateVoteAggregates(filter: $filter, owner: $owner) {
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
export const onUpdateVoteAggregates = /* GraphQL */ `
  subscription OnUpdateVoteAggregates(
    $filter: ModelSubscriptionVoteAggregatesFilterInput
    $owner: String
  ) {
    onUpdateVoteAggregates(filter: $filter, owner: $owner) {
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
export const onDeleteVoteAggregates = /* GraphQL */ `
  subscription OnDeleteVoteAggregates(
    $filter: ModelSubscriptionVoteAggregatesFilterInput
    $owner: String
  ) {
    onDeleteVoteAggregates(filter: $filter, owner: $owner) {
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
export const onCreateVote = /* GraphQL */ `
  subscription OnCreateVote(
    $filter: ModelSubscriptionVoteFilterInput
    $owner: String
  ) {
    onCreateVote(filter: $filter, owner: $owner) {
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
export const onUpdateVote = /* GraphQL */ `
  subscription OnUpdateVote(
    $filter: ModelSubscriptionVoteFilterInput
    $owner: String
  ) {
    onUpdateVote(filter: $filter, owner: $owner) {
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
export const onDeleteVote = /* GraphQL */ `
  subscription OnDeleteVote(
    $filter: ModelSubscriptionVoteFilterInput
    $owner: String
  ) {
    onDeleteVote(filter: $filter, owner: $owner) {
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
