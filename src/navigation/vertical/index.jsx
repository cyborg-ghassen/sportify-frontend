import dashboards from "./dashboards";
import account from "./account";
import sessions from "./sessions";
import teams from "./teams";
import structure from "./structure";

const navigation = [...dashboards, ...account, ...sessions, ...teams, ...structure];

export default navigation