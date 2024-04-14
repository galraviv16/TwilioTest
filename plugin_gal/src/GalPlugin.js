import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomTaskList from './components/CustomTaskList/CustomTaskList';

const PLUGIN_NAME = 'GalPlugin';

export default class GalPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   *  This code is run when your plugin is being started
   *  Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    // Add an event listener for the 'reservationCreated' event
    manager.workerClient.on('reservationCreated', (reservation) => {
      // Get the task associated with the created reservation
      const task = TaskHelper.getTaskByTaskSid(reservation.sid);

      // Check if the task is not an initial outbound attempt
      if (!TaskHelper.isInitialOutboundAttemptTask(task)) {
        // Automatically accept the task
        flex.Actions.invokeAction('AcceptTask', {
          sid: reservation.sid,
          isAutoAccept: true,
        });
      }
    });
  }
}
