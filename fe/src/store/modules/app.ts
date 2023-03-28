export interface StateProps {
}
export interface ActionsType {
    commit(actionHandler: string, actionObject?: any): void
}

const state: StateProps = {
}

const mutations = {
}

export default {
    namespaced: true,
    state,
    mutations
}
