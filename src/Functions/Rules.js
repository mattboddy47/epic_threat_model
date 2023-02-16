const or_condition = "or"
const and_condition = "and"

// This function takes in either a is_condition or an is_not condition and then returns whether that is met.
export function check_condition(is_is_not_condition, rule_is_is_not, technology, data_type, is_condition) {
    if (rule_is_is_not === "") {
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
    return !tech.some(t => asset_to_find.every(tech => tech === t.name))
}

export function check_security_stack_contains_assets(asset_to_find, tech) {
    // eslint-disable-next-line 
    if (asset_to_find == undefined) {
        return true
    }

    if (asset_to_find.length === 0) {
        return true;
    }

    return tech.some(t => asset_to_find.every(tech => tech === t.name))

}

export function checkThreatMitigated(security_mitigations, securityTech, tech) {
    // eslint-disable-next-line 
    if (security_mitigations == undefined) {
        return false
    }

    if (security_mitigations.length === 0) {
        return false;
    }

    const applicableSecurityTech = check_security_stack_protects_tech(tech, securityTech);
    const threatMitigated = checkSecurityMitigationsForTech(applicableSecurityTech, security_mitigations)
     
    return threatMitigated;
}

function checkSecurityMitigationsForTech(tech, security_mitigations){
    // this checks whether there is a mitigation in place via a setting or a security tech
    const threatMitigated = tech.some(
        t => 
        security_mitigations.every(
            mitigation => {
                const mitigatedTech = mitigation === t.name

                if (t.settings){
                const mitigatedSetting = t.settings.some(
                    setting => setting === mitigation
                )
                return mitigatedTech || mitigatedSetting;
                }
                return mitigatedTech;
            }
            ))

            return threatMitigated;
}


export function check_security_stack_protects_tech(tech, securityTech) {
    // finds if the asset name is in the protectedTech field of the security technology
    return securityTech.filter(secTech => secTech.protectedTech.some(protectedTech => protectedTech === tech.asset))

}

export function applyRulesToTech(rules, allTech, securityStack) {
    const result = [];

    allTech.forEach(technology => {
        rules.forEach(rule => {
            // eslint-disable-next-line 
            if (technology[rule.data_type.toLowerCase()] == undefined) {
                return;
            };

            const threatMitigated = checkThreatMitigated(rule.security_mitigations, securityStack, technology)
            if (threatMitigated) {
                return;
            }


            // check whether the is_condition is met, and set this variable accordingly.

            const is_condition_met = check_condition(rule.is_condition, rule.is, technology, rule.data_type.toLowerCase(), true);
            if (!is_condition_met) {
                return;
            }

            const is_not_condition_met = check_condition(rule.is_not_condition, rule.is_not, technology, rule.data_type.toLowerCase(), false);
            if (!is_not_condition_met) {
                return;
            }

            const tech_stack_does_not_contain_asset = check_security_stack_does_not_contain_assets(rule.tech_stack_does_not_contain, allTech)
            if (!tech_stack_does_not_contain_asset) {
                return;
            }

            const tech_stack_contains_required_asset = check_security_stack_contains_assets(rule.tech_stack_contains, allTech)
            if (!tech_stack_contains_required_asset) {
                return;
            }

            const new_rule = Object.create(rule);

            new_rule.matched_technology_name = technology.asset;
            new_rule.matched_technology_id = technology.id;
            new_rule.matched_technology_description = technology.description;
            new_rule.matched_technology_what = technology.what;
            new_rule.matched_technology_who = technology.who;
            new_rule.matched_technology_how = technology.how;
            new_rule.matched_technology_why = technology.why;
            new_rule.matched_technology_stores_data = technology.storesData;
            result.push(new_rule);


        })
    })
    return result;
}