import React, { createRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Chart from 'chart.js';
import moment from 'moment';
import _ from 'lodash';

import {
  GetComponentStatsQuery,
  GetComponentStatsQueryVariables,
} from '../../../types/generated/graphql';
import { GET_COMPONENT_STATS } from '../../../api/query/statistics';
import { Flex } from '../../common/layout/base';
import { Loader, Alert } from '../../common/misc';

/* Props - <Statistics />
============================================================================= */
type Props = {
  componentId: string;
};

/* <Statistics />
============================================================================= */
const Statistics: React.FC<Props> = ({ componentId }) => {
  const statsRef = createRef<HTMLCanvasElement>();

  const { data: statsData, loading: statsLoading, error: statsError } = useQuery<
    GetComponentStatsQuery,
    GetComponentStatsQueryVariables
  >(GET_COMPONENT_STATS, {
    variables: {
      where: {
        componentId: {
          equals: componentId,
        },
      },
    },
    pollInterval: 4000,
  });

  useEffect(() => {
    /* Get canvas context */
    const ctx = statsRef?.current?.getContext('2d');

    /* Check if canvas context was found */
    if (!ctx || !statsData) {
      return;
    }

    /* Create labels */
    const data = {
      [moment().subtract(4, 'day').format('LL')]: 0,
      [moment().subtract(3, 'day').format('LL')]: 0,
      [moment().subtract(2, 'day').format('LL')]: 0,
      [moment().subtract(1, 'day').format('LL')]: 0,
      [moment().format('LL')]: 0,
    };

    /* Group by days */
    statsData.statRecords?.forEach((stat) => {
      const date = moment(stat.createdAt).format('LL');

      if (date in data) {
        data[date]++;
      }
    });

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: '#4ac561',
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Number of requests for this component',
          fontColor: 'white',
          fontFamily: "'Roboto', sans-serif",
          fontSize: 16,
        },
        legend: {
          display: false,
        },
        tooltips: {
          displayColors: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: '#b5b5b5',
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              display: false,
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
  }, [statsRef, statsData]);

  /* Render error message */
  if (statsError) {
    return <Alert type="danger">{statsError.message}</Alert>;
  }

  /* Render loader */
  if (statsLoading) {
    return (
      <Flex alignItems="center" justifyContent="center" width="100%">
        <Loader />
      </Flex>
    );
  }

  /* Render chart */
  if (statsData) {
    return (
      <Flex alignItems="center" justifyContent="center" height="100%">
        <canvas ref={statsRef} width="100%"></canvas>
      </Flex>
    );
  }

  return null;
};

export default Statistics;
