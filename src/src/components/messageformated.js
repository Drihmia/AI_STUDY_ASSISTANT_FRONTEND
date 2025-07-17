const formatMessage = ({ parts, role }) => {
  //console.log('parts', parts);
  //console.log('role', role);
  parts = parts[0] === '\n' ? parts : '\n' + parts;
  if (role === 'user') {
    parts = parts.replace(/ /g, "&ensp;");
    parts = parts.replace(/\n/g, "<br>");
    // it shoud scape all the html tags
  //} else if (role === 'model' && !parts.includes('<form ')) {
    //parts = parts.replace(/ /g, "&ensp;");
  }

  return parts;
};

export default formatMessage;
