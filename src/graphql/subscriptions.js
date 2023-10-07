/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateApplicant = /* GraphQL */ `
  subscription OnCreateApplicant(
    $filter: ModelSubscriptionApplicantFilterInput
  ) {
    onCreateApplicant(filter: $filter) {
      id
      firstname
      lastname
      product
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateApplicant = /* GraphQL */ `
  subscription OnUpdateApplicant(
    $filter: ModelSubscriptionApplicantFilterInput
  ) {
    onUpdateApplicant(filter: $filter) {
      id
      firstname
      lastname
      product
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteApplicant = /* GraphQL */ `
  subscription OnDeleteApplicant(
    $filter: ModelSubscriptionApplicantFilterInput
  ) {
    onDeleteApplicant(filter: $filter) {
      id
      firstname
      lastname
      product
      createdAt
      updatedAt
    }
  }
`;
export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog($filter: ModelSubscriptionBlogFilterInput) {
    onCreateBlog(filter: $filter) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog($filter: ModelSubscriptionBlogFilterInput) {
    onUpdateBlog(filter: $filter) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog($filter: ModelSubscriptionBlogFilterInput) {
    onDeleteBlog(filter: $filter) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
      id
      title
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
      id
      title
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
      id
      title
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
      id
      post {
        id
        title
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
      postCommentsId
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
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
      postCommentsId
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
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
      postCommentsId
    }
  }
`;
