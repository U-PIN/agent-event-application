import React from 'react';
import axios from 'axios';
import Container from 'aws-northstar/layouts/Container';
import SearchUtility from '../SearchUtility/SearchUtility';
import AgentEventTable from '../Table/AgentEventTable';

class PageContainer extends React.PureComponent {
  constructor(props) {
      super(props);

      const endDatetime = new Date();
      const endTime = endDatetime.getUTCFullYear() + 
                  '-' + 
                  (endDatetime.getUTCMonth() + 1).toString().padStart(2, '0') + 
                  '-' + 
                  endDatetime.getUTCDate().toString().padStart(2, '0') + 
                  'T' + 
                  endDatetime.getUTCHours().toString().padStart(2, '0') + 
                  ':' + 
                  endDatetime.getUTCMinutes().toString().padStart(2, '0') + 
                  ':' + 
                  endDatetime.getUTCSeconds().toString().padStart(2, '0') + 
                  'Z';

      const startDatetime = endDatetime;
      startDatetime.setDate(endDatetime.getDate() - 3);
      const startTime = startDatetime.getUTCFullYear() + 
                  '-' + 
                  (startDatetime.getUTCMonth() + 1).toString().padStart(2, '0') + 
                  '-' + 
                  startDatetime.getUTCDate().toString().padStart(2, '0') + 
                  'T' + 
                  startDatetime.getUTCHours().toString().padStart(2, '0') + 
                  ':' + 
                  startDatetime.getUTCMinutes().toString().padStart(2, '0') + 
                  ':' + 
                  startDatetime.getUTCSeconds().toString().padStart(2, '0') + 
                  'Z';
       
      this.state = {
          isLoading: true,
          agentEventList: [],
          eventType: "StateChange",
          startTime: startTime,
          endTime: endTime
      };

      this.handleClick = this.handleClick.bind(this);
      this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
      this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
      this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
  }

  async componentDidMount() {
      await this.getAgentEvents(this.state.eventType, this.state.startTime, this.state.endTime);
  }

  getAgentEvents(eventType, startTime, endTime) {
      axios({
          url: process.env.REACT_APP_AGENT_EVENT_API + "?EventType=" + eventType + "&StartTime=" + startTime + "&EndTime=" + endTime,
          method: 'get'
      })
      .then((response) => {
          console.log(response.data.agent_event_list);
          this.setState({
              agentEventList: response.data.agent_event_list,
              isLoading: false
          })
      })
      .catch((error) => {
          console.log(error);
          this.setState({
              isLoading: false
          })
      })        
  }

  async handleClick() {
      this.setState({
          isLoading: true
      });
      this.getAgentEvents(this.state.eventType, this.state.startTime, this.state.endTime);
  }

  handleStartTimeChange(value) {
      this.setState(
          {
              startTime: value
          }
      )
  }

  handleEndTimeChange(value) {
      this.setState(
          {
              endTime: value
          }
      )
  }

  handleEventTypeChange(event) {
      this.setState(
          {
              eventType: event.target.value
          }
      )
  }

  render() {
      const {
          isLoading,
          agentEventList,
          eventType,
          startTime,
          endTime
      } = this.state;

      return (
          <Container>
              <SearchUtility 
                  eventType={this.state.eventType}
                  startTime={this.state.startTime}
                  endTime={this.state.endTime}
                  handleClick={this.handleClick}
                  handleEventTypeChange={this.handleEventTypeChange}
                  handleStartTimeChange={this.handleStartTimeChange}
                  handleEndTimeChange={this.handleEndTimeChange}
              />
              <AgentEventTable
                  agentEventList={this.state.agentEventList}
                  isLoading={this.state.isLoading}
              />
          </Container>
      )
  }
}

export default PageContainer;