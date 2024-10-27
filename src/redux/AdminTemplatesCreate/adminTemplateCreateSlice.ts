import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ShortPlatformType } from '../../@types/types/platforms'

type initialStateType = {
  templateImg?: File
  previewTempImg?: string
  templateName: string
  templateShortDesc: string
  templateLongDesc: string
  templateTasks: {
    id: number
    iconId: number
    taskDescription: string[]
  }[]
  templateTasksBack: {
    iconId: number
    taskDescription: string[]
  }[],
  templateEvents: {
    id: number
    text: string
  }[],
  templateEventsBack: {
    activitieNum: number
    activitieDescription: string[]
  }[],
  platform: ShortPlatformType | null
}

const initialState: initialStateType = {
  templateImg: undefined,
  previewTempImg: '',
  templateName: '',
  templateShortDesc: '',
  templateLongDesc: '',
  templateTasks: [
    {
      id: 1,
      iconId: 0,
      taskDescription: ['']
    }
  ],
  templateTasksBack: [],
  templateEvents: [{
    id: 1,
    text: ''
  }],
  templateEventsBack: [],
  platform: null
}

const adminTemplateCreateSlice = createSlice({
  name: 'adminTemplateCreate',
  initialState,
  reducers: {
    setTemplateImg: (state, actions: PayloadAction<File | undefined>) => {
      state.templateImg = actions.payload
    },
    setTemplateImagePreview: (state, actions: PayloadAction<string>) => {
      state.previewTempImg = actions.payload
    },
    setTemplateName: (state, actions: PayloadAction<string>) => {
      state.templateName = actions.payload
    },
    setTemplateShortDesc: (state, actions: PayloadAction<string>) => {
      state.templateShortDesc = actions.payload
    },
    setTemplateLongDesc: (state, actions: PayloadAction<string | null>) => {
      state.templateLongDesc = actions.payload ? actions.payload : ''
    },
    setPlatform: (state, actions: PayloadAction<ShortPlatformType | null>) => {
      state.platform = actions.payload
    },
    setTemplatesTasks: (state, actions: PayloadAction<{ iconId: number; taskDescription: string[] }[]>) => {
      const receivedTasks = actions.payload ? actions.payload : []
      state.templateTasks = receivedTasks.map((task, index) => {
        return {
          id: index + 1,
          iconId: task.iconId,
          taskDescription: task.taskDescription
        }
      })
      state.templateTasksBack = receivedTasks
    },
    addTemplateTask: (state) => {
      const length = state.templateTasks.length
      state.templateTasks = [
        ...state.templateTasks,
        {
          id: length !== 0 ? state.templateTasks[length - 1].id + 1 : 1,
          iconId: 0,
          taskDescription: ['']
        }
      ]
    },
    editTemplateTask: (state, actions: PayloadAction<{ id: number; iconId: number; taskDescription: string[] }>) => {
      const newTasks = [...state.templateTasks]
      const newTask = newTasks.find((task) => task.id === actions.payload.id)
      const newTaskId = newTask && newTasks.indexOf(newTask)
      newTaskId !== -1 &&
        newTaskId !== undefined &&
        newTasks.splice(newTaskId, 1, {
          id: actions.payload.id,
          iconId: actions.payload.iconId,
          taskDescription: actions.payload.taskDescription
        })
      state.templateTasks = newTasks
      const tasksForBack = newTasks.map((task) => {
        return {
          iconId: task.iconId,
          taskDescription: task.taskDescription
        }
      })
      state.templateTasksBack = tasksForBack.filter((task) => task.taskDescription[0] !== '')
    },
    deleteTemplateTask: (state, actions: PayloadAction<number>) => {
      state.templateTasks = state.templateTasks.filter((task) => task.id !== actions.payload)
      const newBackTasks = state.templateTasks.map((task) => {
        return {
          iconId: task.iconId,
          taskDescription: task.taskDescription
        }
      })
      state.templateTasksBack = newBackTasks.filter((task) => task.taskDescription[0] !== '')
    },
    setTemplateEvents: (state, actions: PayloadAction<{
      id: number,
      text: string
    }[]>) => {
      const receivedEvents = actions.payload ? actions.payload : []
      state.templateEvents = receivedEvents
      state.templateEventsBack = receivedEvents.map((event, index) => {
        return {
          activitieNum: event.id,
          activitieDescription: [event.text]
        }
      })
    },
    addTemplateEvent: (state) => {
      const length = state.templateEvents.length
      state.templateEvents = [
        ...state.templateEvents,
        {
          id: length !== 0 ? length + 1 : 1,
          text: ''
        }
      ]
    },
    editTemplateEvent: (state, actions: PayloadAction<{ id: number; text: string }>) => {
      const newEvents = [...state.templateEvents]
      const newEvent = newEvents.find((event) => event.id === actions.payload.id)
      const newEventId = newEvent && newEvents.indexOf(newEvent)
      newEventId !== -1 &&
        newEventId !== undefined &&
        newEvents.splice(newEventId, 1, {
          id: newEventId + 1,
          text: actions.payload.text
        })
      state.templateEvents = newEvents
      const tasksForBack = newEvents.map((event) => {
        return {
          iconId: event.id,
          taskDescription: [event.text]
        }
      })
      state.templateTasksBack = tasksForBack.filter((task) => task.taskDescription[0] !== '')
    },
    deleteTemplateEvent: (state, actions: PayloadAction<number>) => {
      const newFilteredEvents = state.templateEvents.filter((event) => event.id !== actions.payload)
      state.templateEvents = newFilteredEvents.map((event, index) => {
        return ({
          id: index + 1,
          text: event.text
        })
      })
      const newBackEvents = state.templateEvents.map((event) => {
        return {
          iconId: event.id,
          taskDescription: [event.text]
        }
      })
      const newFilteredBackEvents = newBackEvents.filter((event) => event.taskDescription[0] !== '')
      state.templateTasksBack = newFilteredBackEvents.map((event, index) => {
        return ({
          iconId: index + 1,
          taskDescription: event.taskDescription
        })
      })
    },
    resetAll: () => initialState
  }
})

export const {
  setTemplateImg,
  setTemplateImagePreview,
  setTemplateName,
  setTemplateShortDesc,
  setTemplateLongDesc,
  setTemplatesTasks,
  addTemplateTask,
  editTemplateTask,
  deleteTemplateTask,
  setTemplateEvents,
  addTemplateEvent,
  editTemplateEvent,
  deleteTemplateEvent,
  setPlatform,
  resetAll
} = adminTemplateCreateSlice.actions

export default adminTemplateCreateSlice.reducer
