/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        createdAt
        updatedAt
        postCommentsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const usersByEmail = /* GraphQL */ `
  query UsersByEmail(
    $email: AWSEmail!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const usersBySub = /* GraphQL */ `
  query UsersBySub(
    $sub: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersBySub(
      sub: $sub
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getIssue = /* GraphQL */ `
  query GetIssue($id: ID!) {
    getIssue(id: $id) {
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
export const listIssues = /* GraphQL */ `
  query ListIssues(
    $filter: ModelIssueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIssues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const issuesByNumber = /* GraphQL */ `
  query IssuesByNumber(
    $type: String!
    $number: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelIssueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    issuesByNumber(
      type: $type
      number: $number
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getCalendarListing = /* GraphQL */ `
  query GetCalendarListing($id: ID!) {
    getCalendarListing(id: $id) {
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
export const listCalendarListings = /* GraphQL */ `
  query ListCalendarListings(
    $filter: ModelCalendarListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCalendarListings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
      nextToken
      __typename
    }
  }
`;
export const listingsByApproval = /* GraphQL */ `
  query ListingsByApproval(
    $approval: Approval!
    $eventDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCalendarListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listingsByApproval(
      approval: $approval
      eventDate: $eventDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
      nextToken
      __typename
    }
  }
`;
export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
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
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        createdAt
        updatedAt
        blogPostsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEntry = /* GraphQL */ `
  query GetEntry($id: ID!) {
    getEntry(id: $id) {
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
export const listEntries = /* GraphQL */ `
  query ListEntries(
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        issue
        region
        userEntriesId
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const entriesByUser = /* GraphQL */ `
  query EntriesByUser(
    $userEntriesId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    entriesByUser(
      userEntriesId: $userEntriesId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        issue
        region
        userEntriesId
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const messagesBySender = /* GraphQL */ `
  query MessagesBySender(
    $senderId: ID!
    $createdAtType: ModelMessageMessagesBySenderCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesBySender(
      senderId: $senderId
      createdAtType: $createdAtType
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const messagesByRecipient = /* GraphQL */ `
  query MessagesByRecipient(
    $recipientId: ID!
    $createdAtType: ModelMessageMessagesByRecipientCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByRecipient(
      recipientId: $recipientId
      createdAtType: $createdAtType
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getVoteAggregates = /* GraphQL */ `
  query GetVoteAggregates($id: ID!) {
    getVoteAggregates(id: $id) {
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
export const listVoteAggregates = /* GraphQL */ `
  query ListVoteAggregates(
    $filter: ModelVoteAggregatesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVoteAggregates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        competitionId
        entryId
        votes
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const votesByCompetition = /* GraphQL */ `
  query VotesByCompetition(
    $competitionId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVoteAggregatesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    votesByCompetition(
      competitionId: $competitionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        competitionId
        entryId
        votes
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getVote = /* GraphQL */ `
  query GetVote($id: ID!) {
    getVote(id: $id) {
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
export const listVotes = /* GraphQL */ `
  query ListVotes(
    $filter: ModelVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        competitionId
        entryId
        userId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
