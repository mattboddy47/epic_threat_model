


export function applyCWEsToTech(CWEs, tech) {
    const result = [];
  
    const programming_languages = tech.filter(t => {
      return t.name === "Programming Language"
    })
  
    if (programming_languages.length === 0) {
      return result;
    }
  
    CWEs.forEach(CWE => {
      if (CWE["Applicable Platforms"].includes("Language-Independent")) {
        result.push(CWE)
        return;
      }
  
  
      programming_languages.forEach(programming_language => {
        if (CWE["Applicable Platforms"].includes(programming_language.asset)) {
          if (result.indexOf(CWE) === -1) {
            result.push(CWE);
          }
        }
      })
    })
    return result;
  }
  
  