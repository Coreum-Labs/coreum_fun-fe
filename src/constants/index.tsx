import { Token } from "@/shared/types";
import coreumLogo from "../../../public/coreum.svg";
import ticketLogo from "../../../public/ticket.svg";

export const COREUM_TOKEN_TESTNET: Token = {
  denom: "utestcore",
  symbol: "Coreum",
  subunit: "utestcore",
  precision: 6,
  logo: coreumLogo,
};

export const TICKET_TOKEN_TESTNET: Token = {
  denom: "uticket-testcore1zgdprlr3hz5hhke9ght8mq723a8wlnzqcepjcd",
  symbol: "Ticket",
  subunit: "uticket-testcore1zgdprlr3hz5hhke9ght8mq723a8wlnzqcepjcd",
  precision: 1,
  logo: ticketLogo,
};
