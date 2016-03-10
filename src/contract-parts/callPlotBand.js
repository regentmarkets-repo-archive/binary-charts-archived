export default (from, to, name) => [{
    from,
    to,
    color: 'rgba(255, 0, 0, 0.1)',
    label: {
        text: name,
        style: {
            color: 'rgba(255, 0, 0, 1)'
        }
    }
}];
