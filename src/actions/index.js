export const CREATE_REMAKE = 'create_remake'

export function createRemake (values) {
  return {
    type: CREATE_REMAKE,
    payload: {title: values}
  }
}
