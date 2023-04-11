import css from '../styles/Contactlist.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';
import { useEffect } from 'react';

const Contactlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contacts = useSelector(state => {
    const filteredContacts = state.contacts.contacts.items.filter(contact =>
      contact.name.toLowerCase().includes(state.contacts.filter.toLowerCase())
    );
    return filteredContacts;
  });
  return (
    <div className={css.contacts_wrapper}>
      <ul className={css.contact_list}>
        {contacts.map(({ id, name, phone }) => (
          <li key={id} className={css.contact_list_item}>
            <p>
              {name}: {phone}
            </p>
            <button
              type="button"
              onClick={() => dispatch(deleteContact(id))}
              name={id}
              className={css.remove_button}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contactlist;
