import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getHealthStatus } from '../services/getHealthStatus';

export const StatusDashboard = () => {
  const [timeInterval, setTimeInterval] = useState(10);
  const handleIntervalChange = event => {
    setTimeInterval(event.target.value);
  }
  const [endpointHealthStatuses, setEndpointHealthStatuses] = useState([]);

  const endpointsToCheck = [
    'accounts',
    'assets',
    'customers',
    'datapoints',
    'devices',
    'documents',
    'forms',
    'invites',
    'media',
    'messages',
    'namepaces',
    'orders',
    'patients',
    'relationships',
    'rules',
    'templates',
    'users',
    'workflows'
  ];

  useEffect(() => {
    const interval = setInterval(async () => {
      if (timeInterval >= 5) {
        console.log(`Calling API every ${timeInterval} seconds`);

        // const accountPromise = getHealthStatus({endpoint: 'accounts'})
        // const assetPromise = getHealthStatus({endpoint: 'assets'})
        // const customerPromise = getHealthStatus({endpoint: 'customers'})
        // const datapointPromise = getHealthStatus({endpoint: 'datapoints'})
        // const devicePromise = getHealthStatus({endpoint: 'devices'})
        // const documentPromise = getHealthStatus({endpoint: 'documents'})
        // const formPromise = getHealthStatus({endpoint: 'forms'})
        // const invitePromise = getHealthStatus({endpoint: 'invites'})
        // const mediaPromise = getHealthStatus({endpoint: 'media'})
        // const messagePromise = getHealthStatus({endpoint: 'messages'})
        // const namespacePromise = getHealthStatus({endpoint: 'namepaces'})
        // const orderPromise = getHealthStatus({endpoint: 'orders'})
        // const patientPromise = getHealthStatus({endpoint: 'patients'})
        // const relationshipPromise = getHealthStatus({endpoint: 'relationships'})
        // const rulePromise = getHealthStatus({endpoint: 'rules'})
        // const templatePromise = getHealthStatus({endpoint: 'templates'})
        // const userPromise = getHealthStatus({endpoint: 'users'})
        // const workflowPromise = getHealthStatus({endpoint: 'workflows'})


        const promises = [
          getHealthStatus({ endpoint: 'accounts' }),
          getHealthStatus({ endpoint: 'assets' }),
          getHealthStatus({ endpoint: 'customers' }),
          getHealthStatus({ endpoint: 'datapoints' }),
          getHealthStatus({ endpoint: 'devices' }),
          getHealthStatus({ endpoint: 'documents' }),
          getHealthStatus({ endpoint: 'forms' }),
          getHealthStatus({ endpoint: 'invites' }),
          getHealthStatus({ endpoint: 'media' }),
          getHealthStatus({ endpoint: 'messages' }),
          getHealthStatus({ endpoint: 'namepaces' }),
          getHealthStatus({ endpoint: 'orders' }),
          getHealthStatus({ endpoint: 'patients' }),
          getHealthStatus({ endpoint: 'relationships' }),
          getHealthStatus({ endpoint: 'rules' }),
          getHealthStatus({ endpoint: 'templates' }),
          getHealthStatus({ endpoint: 'users' }),
          getHealthStatus({ endpoint: 'workflows' })
        ]

        const responseResults = await Promise.allSettled(promises)
        console.log(responseResults);
        setEndpointHealthStatuses(responseResults);
      }
    }, timeInterval * 1000);
    return () => clearInterval(interval);
  }, [timeInterval]);

  useEffect(() => {
    var convertedDate = new Date(1234567890000);
    console.log(convertedDate);
  }, [])
  

  return (
    <div>
      <h2>Status Dashboard</h2>
      <form>
        <label htmlFor="timeInterval">Time Interval in seconds: </label>
        <input
          type="number"
          id="timeInterval"
          name="timeInterval"
          value={timeInterval}
          onChange={handleIntervalChange}
          min={5}
          max={3600}
          style={{ width: '45px' }}
        />
        <br />
        <small>Can make calls from every 5 seconds to every hour (5 to 3600 seconds)</small>
        {timeInterval < 5 && (
          <h3 style={{ color: 'red' }}>Invalid number of seconds! Not making any API Calls</h3>
        )}
      </form>
      <div className="row">
        <div>
          {endpointHealthStatuses.length === 0 && timeInterval > 0 && (
            <h3 style={{ color: 'yellow' }}>Loading Health Statuses of all Endpoints...</h3>
          )}
          {endpointHealthStatuses.length > 0 && (
            <div>
              {(endpointHealthStatuses)?.map((endpoint, index) => (
                <div className="column" key={index}>
                  <div className="parent">
                    <b>
                      <h3>Endpoint: <b>{String(endpointsToCheck[index]).toUpperCase()}</b></h3>
                      {endpoint.status === 'fulfilled' && (
                        <div>
                        <h4 style={{ color: 'green' }}>Message: {endpoint.value.message}</h4>
                        <h4 style={{ color: 'green' }}>Time: {Date(endpoint.value.time)}</h4>
                        <h4 style={{ color: 'green' }}>Hostname: {endpoint.value.hostname}</h4>
                        </div>
                      )}
                      {endpoint.status === 'rejected' && (
                        <div>
                        <h4 style={{ color: 'red' }}>Message: Error</h4>
                        <h3 style={{ color: 'red' }}>OUTAGE</h3>
                        <h4 style={{ color: 'red' }}>403</h4>
                        </div>
                      )}
                    </b>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
