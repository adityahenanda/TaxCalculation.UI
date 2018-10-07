module.exports = [
    {
        route: 'TaxCalculation',
        name: 'TaxCalculation',
        moduleId: './modules/master/TaxCalculation/index',
        nav: true,
        title: 'TaxCalculation',
        auth: true,
        settings: {
            group: "master",
            permission: { "C9": 1, "A2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
]

