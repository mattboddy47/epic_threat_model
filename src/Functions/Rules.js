const or_condition = "or"
const and_condition = "and"

// This function takes in either a is_condition or an is_not condition and then returns whether that is met.
export function check_condition(is_is_not_condition, rule_is_is_not, technology, data_type, is_condition) {
    if (rule_is_is_not === "") {
        console.log(is_condition + " rule blank")
        return true;
    }
    if (is_condition) {
        return check_is_condition(is_is_not_condition, rule_is_is_not, technology, data_type)
    }
    return !check_is_condition(is_is_not_condition, rule_is_is_not, technology, data_type)

}
export function check_is_condition(is_is_not_condition, rule_is_is_not, technology, data_type) {
    if (is_is_not_condition === or_condition) {
        return rule_is_is_not.some(element => {
            return technology[data_type].includes(element);
        });

    } else if (is_is_not_condition === and_condition) {

        return rule_is_is_not.every(element => {
            return technology[data_type].includes(element);
        });
    }
}

export function check_security_stack_does_not_contain_assets(asset_to_find, tech) {
    // eslint-disable-next-line 
    if (asset_to_find == undefined) {
        return true
    }

    if (asset_to_find.length === 0) {
        return true;
    }

    return !tech.some(t => asset_to_find.some(tech => tech === t.name))

}

export function check_security_stack_contains_assets(asset_to_find, tech) {
    // eslint-disable-next-line 
    if (asset_to_find == undefined) {
        return true
    }

    if (asset_to_find.length === 0) {
        return true;
    }

    return tech.some(t => asset_to_find.some(tech => tech === t.name))

}

export function applyRulesToTech(rules, allTech, securityStack) {
    const result = [];

    allTech.forEach(technology => {
        rules.forEach(rule => {
            // eslint-disable-next-line 
            if (technology[rule.data_type.toLowerCase()] == undefined) {
                return;
            };


            // check whether the is_condition is met, and set this variable accordingly.

            const is_condition_met = check_condition(rule.is_condition, rule.is, technology, rule.data_type.toLowerCase(), true);

            const is_not_condition_met = check_condition(rule.is_not_condition, rule.is_not, technology, rule.data_type.toLowerCase(), false);

            const tech_stack_does_not_contain_asset = check_security_stack_does_not_contain_assets(rule.tech_stack_does_not_contain, securityStack)
            const tech_stack_contains_required_asset = check_security_stack_contains_assets(rule.tech_stack_contains, securityStack)

            if (is_condition_met && is_not_condition_met && tech_stack_does_not_contain_asset && tech_stack_contains_required_asset) {
                const new_rule = Object.create(rule);

                new_rule.matched_technology_name = technology.asset;
                new_rule.matched_technology_id = technology.id;
                new_rule.matched_technology_description = technology.description;
                new_rule.matched_technology_what = technology.what;
                new_rule.matched_technology_who = technology.who;
                new_rule.matched_technology_how = technology.how;
                new_rule.matched_technology_why = technology.why;
                new_rule.matched_technology_stores_data = technology.storesData;
                result.push(new_rule)
            }


        })
    })
    return result;
}