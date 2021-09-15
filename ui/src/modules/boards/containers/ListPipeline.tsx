import * as compose from 'lodash.flowright';

import React, { Component } from 'react';
import { IOptions, IPipeline, StagesQueryResponse } from '../types';
import gql from 'graphql-tag';
import EmptyState from 'modules/common/components/EmptyState';
import { withProps } from 'modules/common/utils';
import { graphql } from 'react-apollo';
import { queries } from '../graphql';
import styled from 'styled-components';
import { PRIORITIES } from '../constants';
import ListGroupBy from './ListGroupBy';

const Container = styled.div`
  min-height: 480px;
  overflow: auto;
  background-color: white;
`;

type Props = {
  pipeline: IPipeline;
  queryParams: any;
  options: IOptions;
};

type WithStagesProps = {
  stagesQuery: any;
  pipelineLabelsQuery: any;
  pipelineAssigneeQuery: any;
} & Props;
class WithStages extends Component<WithStagesProps> {
  componentWillReceiveProps(nextProps: WithStagesProps) {
    const { stagesQuery, queryParams } = this.props;
    const { pipelineId } = queryParams;

    if (this.queryParamsChanged(queryParams, nextProps.queryParams)) {
      stagesQuery.refetch({ pipelineId });
    }
  }

  queryParamsChanged = (queryParams: any, nextQueryParams: any) => {
    if (nextQueryParams.itemId || (!queryParams.key && queryParams.itemId)) {
      return false;
    }

    if (queryParams !== nextQueryParams) {
      return true;
    }

    return false;
  };

  countStages(obj) {
    return Object.keys(obj).length;
  }

  render() {
    const {
      options,
      queryParams,
      stagesQuery,
      pipelineLabelsQuery,
      pipelineAssigneeQuery
    } = this.props;

    let groupType = 'stage';
    let groups: any[] = [];

    if (queryParams.groupBy === 'label') {
      groups = pipelineLabelsQuery.pipelineLabels || [];
      groupType = 'label';
    } else if (queryParams.groupBy === 'priority') {
      groups = PRIORITIES.map(p => ({ _id: p, name: p } || []));
      groupType = 'priority';
    } else if (queryParams.groupBy === 'assign') {
      groups = pipelineAssigneeQuery.pipelineAssignedUsers || [];
      groupType = 'assign';
    } else if (queryParams.groupBy === 'dueDate') {
      const getDueDate = () => [
        {
          _id: 'overDue',
          name: 'Overdue',
          startDate: null,
          endDate: new Date()
        }
      ];

      groups = getDueDate();
      groupType = 'dueDate';
    } else {
      groups = stagesQuery.stages || [];
      groupType = 'stage';
    }

    if (groups.length === 0) {
      return (
        <EmptyState
          image="/images/actions/8.svg"
          text="No stage in this pipeline"
          size="small"
          light={true}
        />
      );
    }

    return (
      <Container>
        {groups.map((groupObj, index) => (
          <ListGroupBy
            key={groupObj._id}
            options={options}
            groupObj={groupObj}
            groupType={groupType}
            index={index}
            length={groups.length}
            queryParams={queryParams}
            refetchStages={stagesQuery.refetch}
          />
        ))}
      </Container>
    );
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, StagesQueryResponse>(gql(queries.stages), {
      name: 'stagesQuery',
      options: ({ pipeline, queryParams, options: { getExtraParams } }) => ({
        variables: {
          pipelineId: pipeline._id,
          search: queryParams.search,
          customerIds: queryParams.customerIds,
          companyIds: queryParams.companyIds,
          assignedUserIds: queryParams.assignedUserIds,
          labelIds: queryParams.labelIds,
          extraParams: getExtraParams(queryParams),
          closeDateType: queryParams.closeDateType,
          userIds: queryParams.userIds,
          assignedToMe: queryParams.assignedToMe
        }
      })
    }),
    graphql<Props, StagesQueryResponse>(gql(queries.pipelineLabels), {
      name: 'pipelineLabelsQuery',
      options: ({ pipeline }) => ({
        variables: {
          pipelineId: pipeline._id
        }
      })
    }),
    graphql<Props, StagesQueryResponse>(gql(queries.pipelineAssignedUsers), {
      name: 'pipelineAssigneeQuery',
      options: ({ pipeline }) => ({
        variables: {
          _id: pipeline._id
        }
      })
    })
  )(WithStages)
);
