const haelp = `
@compiler >= 6

include "List.aes"

contract Haelp =

    record campaign = {
        owner : address,
        title : string,
        description : string,
        image : string,
        target : int,
        donated : int,
        withdrawn: int }

    record state = {
        totalCampaigns : int,
        campaigns : list(campaign) }

    stateful entrypoint init() = 
        { totalCampaigns = 0,
          campaigns = [] }

    public stateful entrypoint create_campaign(title: string, description: string, image: string, target: int) = 
            let new_campaign : campaign = {
                owner = Call.caller,
                title = title,
                description = description,
                image = image,
                target = target,
                donated = 0,
                withdrawn = 0 }

            put(state{campaigns = new_campaign :: state.campaigns})
            put(state{totalCampaigns = state.totalCampaigns + 1})

    public entrypoint get_campaigns() = state.campaigns

    payable public stateful entrypoint donate(campaign_id: int) = 
        let c : campaign = List.get(campaign_id, state.campaigns)
        c{donated @ d = d + Call.value}
        put(state{campaigns = List.replace_at(campaign_id, c, state.campaigns)})


    public stateful entrypoint withdraw(campaign_id: int) = 
        let c : campaign = List.get(campaign_id, state.campaigns) 
        require(Call.caller == c.owner, "Only owner of campign can withdraw")
        c{withdrawn @ w = c.donated}
        put(state{campaigns = List.replace_at(campaign_id, c, state.campaigns)})
        Chain.spend(Call.caller, c.donated)

`

export default haelp;