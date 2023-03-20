import { Route, Switch, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

import Table from "./Table";
import Detail from "./Detail";

export default function Contact() {
  const selectedUser = useSelector((state) => state.contact.selectedUser);

  return (
    <Switch>
      <Route exact path="/account/contact">
        <Table />
      </Route>

      {
        !selectedUser ? (
          <Redirect to="/account/contact" />
        ) : (
          <Route path="/account/contact/contact-detail/:id">
            <Detail selectedUser={selectedUser} />
          </Route>
        )
      }
    </Switch>
  );
}
