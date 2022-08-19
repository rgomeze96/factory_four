export function getHealthStatus({ endpoint }) {
    return fetch(`https://api.factoryfour.com/${endpoint}/health/status`)
    .then(response => response.json())
}
