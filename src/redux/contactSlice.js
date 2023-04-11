import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact} from './operations';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  extraReducers: {
      [fetchContacts.pending](state) {
        state.isLoading = true;
      },
      [fetchContacts.fulfilled](state, action) {
        state.isLoading = false;
        state.error = null;        
        state.contacts.items = action.payload;
      },
      [fetchContacts.rejected](state, action) {
        state.isLoading = false
        state.error = action.payload;
      },
      [addContact.pending](state, action) {
        state.isLoading = true;
      },
      [addContact.fulfilled](state, action) {
        state.isLoading = false;
        state.error = null;
        if (state.contacts.items.some(contact => contact.name === action.payload.name)) {
          alert('This contact is already exist');
          return
        }
        state.contacts.items.push(action.payload);              
      },
      [addContact.rejected](state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },
      [deleteContact.pending](state) {
        state.isLoading = true;
      },
      [deleteContact.fulfilled](state, action) {
        state.isLoading = false;  
        state.contacts.items = state.contacts.items.filter((item) => item.id !== action.payload.id);      
      },
      [deleteContact.rejected](state, action) {
        state.isLoading = false;
        state.error = action.payload;
      }

    },

  
  reducers: {    
    filterContacts: (state, actions) => {
      state.filter = actions.payload;
    }
  },
});

export const {filterContacts } =
  contactSlice.actions;

export const contactsReducer = contactSlice.reducer;
