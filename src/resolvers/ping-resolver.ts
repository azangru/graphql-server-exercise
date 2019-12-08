import { Query, Resolver } from "type-graphql";

@Resolver()
export default class PingResolver {
  @Query(() => String)
  ping() {
    return "pong!";
  }
}
