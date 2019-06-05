import shortid from 'shortid';

type AssignIdsToArrayItems = <T = {}>(array: T[]) => ({id: string; value: T})[];

type AssignId = <T = {}>(value: T) => {id: string; value: T};

export const assignIdsToArrayItems: AssignIdsToArrayItems = array =>
  array.map(assignId);

export const assignId: AssignId = value => ({
  id: shortid.generate(),
  value
});
