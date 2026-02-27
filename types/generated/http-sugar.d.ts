import { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface PlatformHttpSugar {
  getBilling(query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putBilling(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getBillingInvoices(invoicesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postBillingInvoicesCharge(invoicesSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getBillingPayment_portal(options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCustomer(query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchCustomer(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putCustomer(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCustomerChat(query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCustomerChat(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putCustomerChat(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCustomerChatFile(formData_file?: any, formData_data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCustomerChatAiAssistant(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCustomerChatKnowledge(query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCustomerGeneratePvmCode(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCustomerLogs(query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCustomerLogsCalculate(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCustomerStatistics(query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCustomerUnsubscribe(query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDeleted(deletedSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDeletedLogs(deletedSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postDeletedLogsCalculate(deletedSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postDeletedRestore(deletedSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteGrantors(grantsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getGrantors(grantsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postGrants(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteGrants(grantsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getGrants(grantsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchGrants(grantsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putGrants(grantsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getGrantsLogs(grantsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postGrantsLogsCalculate(grantsSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteGrantsSubaccounts(grantsSelector: string | number, grantSubaccountsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getGrantsSubaccounts(grantsSelector: string | number, grantSubaccountsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postGrantsSubaccounts(grantsSelector: string | number, grantSubaccountsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postIdentityProviders(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteIdentityProviders(identityProviderSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getIdentityProviders(identityProviderSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchIdentityProviders(identityProviderSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putIdentityProviders(identityProviderSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getIdentityProvidersLogs(identityProviderSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postIdentityProvidersLogsCalculate(identityProviderSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postLimits(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteLimits(limitsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getLimits(limitsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchLimits(limitsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putLimits(limitsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getLimitsLogs(limitsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postLimitsLogsCalculate(limitsSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteOauth(oauthSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getOauth(oauthSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postRealms(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteRealms(realmSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getRealms(realmSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchRealms(realmSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putRealms(realmSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteRealmsIdentityProviders(realmSelector: string | number, realmIdentityProviderSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getRealmsIdentityProviders(realmSelector: string | number, realmIdentityProviderSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postRealmsIdentityProviders(realmSelector: string | number, realmIdentityProviderSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putRealmsIdentityProviders(realmSelector: string | number, realmIdentityProviderSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getRealmsLogs(realmSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postRealmsLogsCalculate(realmSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postRealmsRoles(realmSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteRealmsRoles(realmSelector: string | number, roleSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getRealmsRoles(realmSelector: string | number, roleSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchRealmsRoles(realmSelector: string | number, roleSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putRealmsRoles(realmSelector: string | number, roleSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postRealmsUsers(realmSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteRealmsUsers(realmSelector: string | number, userSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getRealmsUsers(realmSelector: string | number, userSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchRealmsUsers(realmSelector: string | number, userSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putRealmsUsers(realmSelector: string | number, userSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getRealmsUsersConfirmationPassword(realmSelector: string | number, userSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteRealmsUsersIdentityProviders(realmSelector: string | number, userSelector: string | number, userIdentityProviderSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getRealmsUsersIdentityProviders(realmSelector: string | number, userSelector: string | number, userIdentityProviderSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getRealmsUsersIdentityProvidersConfirmation(realmSelector: string | number, userSelector: string | number, userIdentityProviderSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postRealmsUsersLogin(realmSelector: string | number, userSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postRealmsUsersLogout(realmSelector: string | number, userSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteRealmsUsersPassword(realmSelector: string | number, userSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postSubaccounts(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteSubaccounts(subaccountsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getSubaccounts(subaccountsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchSubaccounts(subaccountsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putSubaccounts(subaccountsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getSubaccountsLogs(subaccountsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postSubaccountsLogsCalculate(subaccountsSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postTokens(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteTokens(tokensSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getTokens(tokensSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchTokens(tokensSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putTokens(tokensSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getTokensLogs(tokensSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postTokensLogsCalculate(tokensSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postWebhooks(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteWebhooks(webhooksSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getWebhooks(webhooksSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchWebhooks(webhooksSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putWebhooks(webhooksSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getWebhooksLogs(webhooksSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postWebhooksLogsCalculate(webhooksSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getWebhooksPackets(webhooksSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
}

export interface GwHttpSugar {
  postAssets(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteAssets(assetsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getAssets(assetsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchAssets(assetsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putAssets(assetsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getAssetsIntervals(assetsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postAssetsIntervals(assetsSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getAssetsLogs(assetsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postAssetsLogsCalculate(assetsSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCalcs(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteCalcs(calcsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCalcs(calcsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchCalcs(calcsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putCalcs(calcsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteCalcsAssets(calcsSelector: string | number, calcAssetsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCalcsAssets(calcsSelector: string | number, calcAssetsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCalcsAssets(calcsSelector: string | number, calcAssetsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putCalcsAssets(calcsSelector: string | number, calcAssetsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteCalcsDevices(calcsSelector: string | number, calcDevicesSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCalcsDevices(calcsSelector: string | number, calcDevicesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putCalcsDevices(calcsSelector: string | number, calcDevicesSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCalcsDevicesCalculate(calcsSelector: string | number, calcDevicesSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putCalcsDevicesIntervals(calcsSelector: string | number, calcDevicesSelector: string | number, calcDeviceIntervalsSelectorPut: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCalcsDevicesIntervals(calcsSelector: string | number, calcDevicesSelector: string | number, calcDeviceIntervalsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCalcsDevicesRecalculate(calcsSelector: string | number, calcDevicesSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCalcsDevices(calcsSelector: string | number, devSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteCalcsGeofences(calcsSelector: string | number, calcGeofencesSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCalcsGeofences(calcsSelector: string | number, calcGeofencesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCalcsGeofences(calcsSelector: string | number, calcGeofencesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putCalcsGeofences(calcsSelector: string | number, calcGeofencesSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteCalcsGroups(calcsSelector: string | number, calcGroupsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCalcsGroups(calcsSelector: string | number, calcGroupsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCalcsGroups(calcsSelector: string | number, calcGroupsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putCalcsGroups(calcsSelector: string | number, calcGroupsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCalcsLogs(calcsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCalcsLogsCalculate(calcsSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getChannelProtocols(channelProtocolsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getChannelProtocolsDeviceTypes(channelProtocolsSelector: string | number, devtypesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postChannelProtocolsDeviceTypesAssistance(channelProtocolsSelector: string | number, devtypesSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getChannelProtocolsDeviceTypesKnowledge(channelProtocolsSelector: string | number, devtypesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postChannels(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteChannels(chSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getChannels(chSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchChannels(chSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putChannels(chSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putChannelsCid(chSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteChannelsConnections(chSelector: string | number, connSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getChannelsConnections(chSelector: string | number, connSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getChannelsIdentsPackets(chSelector: string | number, chIdentSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getChannelsIdents(chSelector: string | number, channelIdentSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getChannelsLogs(chSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postChannelsLogsCalculate(chSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteChannelsMessages(chSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getChannelsMessages(chSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postDevices(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteDevices(devSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDevices(devSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchDevices(devSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putDevices(devSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postDevicesCalculate(devSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putDevicesCid(devSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postDevicesCommands(devSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postDevicesCommandsQueue(devSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteDevicesCommandsQueue(devSelector: string | number, devicesCommandsQueueSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDevicesCommandsQueue(devSelector: string | number, devicesCommandsQueueSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDevicesCommandsResult(devSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDevicesCommandsResult(devSelector: string | number, commandIdSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteDevicesConnections(devSelector: string | number, connSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDevicesConnections(devSelector: string | number, connSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteDevicesGeofences(devSelector: string | number, devGeofencesSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDevicesGeofences(devSelector: string | number, devGeofencesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postDevicesGeofences(devSelector: string | number, devGeofencesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDevicesLogs(devSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postDevicesLogsCalculate(devSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteDevicesMedia(devSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDevicesMedia(devSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putDevicesMedia(devSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDevicesMessages(devSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postDevicesMessages(devSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDevicesPackets(devSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteDevicesSettings(devSelector: string | number, settSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDevicesSettings(devSelector: string | number, settSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putDevicesSettings(devSelector: string | number, settSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDevicesSms(devSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postDevicesSms(devSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteDevicesTelemetry(devSelector: string | number, telemetrySelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getDevicesTelemetry(devSelector: string | number, telemetrySelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postGeofences(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteGeofences(geofencesSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getGeofences(geofencesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchGeofences(geofencesSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putGeofences(geofencesSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getGeofencesHittest(geofencesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getGeofencesLogs(geofencesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postGeofencesLogsCalculate(geofencesSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postGroups(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteGroups(groupsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getGroups(groupsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchGroups(groupsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putGroups(groupsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteGroupsAssets(groupsSelector: string | number, groupAssetsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getGroupsAssets(groupsSelector: string | number, groupAssetsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postGroupsAssets(groupsSelector: string | number, groupAssetsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteGroupsDevices(groupsSelector: string | number, groupDevicesSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getGroupsDevices(groupsSelector: string | number, groupDevicesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postGroupsDevices(groupsSelector: string | number, groupDevicesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteGroupsGeofences(groupsSelector: string | number, groupGeofencesSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getGroupsGeofences(groupsSelector: string | number, groupGeofencesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postGroupsGeofences(groupsSelector: string | number, groupGeofencesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getGroupsLogs(groupsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postGroupsLogsCalculate(groupsSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getMessageParameters(messageParameterSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postModems(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteModems(modemSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getModems(modemSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchModems(modemSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putModems(modemSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getModemsLogs(modemSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postModemsLogsCalculate(modemSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getPluginTypes(pluginTypesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postPlugins(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deletePlugins(pluginSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getPlugins(pluginSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchPlugins(pluginSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putPlugins(pluginSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deletePluginsDevices(pluginSelector: string | number, pluginDevicesSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getPluginsDevices(pluginSelector: string | number, pluginDevicesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchPluginsDevices(pluginSelector: string | number, pluginDevicesSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postPluginsDevices(pluginSelector: string | number, pluginDevicesSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putPluginsDevices(pluginSelector: string | number, pluginDevicesSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deletePluginsGeofences(pluginSelector: string | number, pluginGeofencesSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getPluginsGeofences(pluginSelector: string | number, pluginGeofencesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postPluginsGeofences(pluginSelector: string | number, pluginGeofencesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putPluginsGeofences(pluginSelector: string | number, pluginGeofencesSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deletePluginsGroups(pluginSelector: string | number, pluginGroupsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getPluginsGroups(pluginSelector: string | number, pluginGroupsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postPluginsGroups(pluginSelector: string | number, pluginGroupsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putPluginsGroups(pluginSelector: string | number, pluginGroupsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getPluginsLogs(pluginSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postPluginsLogsCalculate(pluginSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getPluginsPackets(pluginSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getStreamProtocols(streamProtocolsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postStreams(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteStreams(streamSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getStreams(streamSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchStreams(streamSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putStreams(streamSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteStreamsChannels(streamSelector: string | number, streamChannelsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getStreamsChannels(streamSelector: string | number, streamChannelsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postStreamsChannels(streamSelector: string | number, streamChannelsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteStreamsDevices(streamSelector: string | number, streamDevicesSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getStreamsDevices(streamSelector: string | number, streamDevicesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postStreamsDevices(streamSelector: string | number, streamDevicesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putStreamsDevices(streamSelector: string | number, streamDevicesSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteStreamsGeofences(streamSelector: string | number, streamGeofencesSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getStreamsGeofences(streamSelector: string | number, streamGeofencesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postStreamsGeofences(streamSelector: string | number, streamGeofencesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putStreamsGeofences(streamSelector: string | number, streamGeofencesSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteStreamsGroups(streamSelector: string | number, streamGroupsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getStreamsGroups(streamSelector: string | number, streamGroupsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postStreamsGroups(streamSelector: string | number, streamGroupsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getStreamsLogs(streamSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postStreamsLogsCalculate(streamSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteStreamsMessages(streamSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postStreamsMessages(streamSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getStreamsPackets(streamSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
}

export interface StorageHttpSugar {
  postCdns(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteCdns(cdnSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCdns(cdnSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchCdns(cdnSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putCdns(cdnSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteCdnsFiles(cdnSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCdnsFiles(cdnSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCdnsFiles(cdnSelector: string | number, formData_file?: any, formData_data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCdnsLogs(cdnSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postCdnsLogsCalculate(cdnSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postContainers(query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteContainers(containerSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getContainers(containerSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patchContainers(containerSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putContainers(containerSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postContainersCalculate(containerSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getContainersLogs(containerSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postContainersLogsCalculate(containerSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteContainersMessages(containerSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getContainersMessages(containerSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postContainersMessages(containerSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getExpressionsFunctions(options?: AxiosRequestConfig): Promise<AxiosResponse>
  postExpressionsTest(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
}

export interface MqttHttpSugar {
  getLogs(query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postLogsCalculate(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postMessages(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteMessages(messagesSelector: string | number, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getMessages(messagesSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postSessions(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteSessions(sessionsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getSessions(sessionsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postSessionsSubscriptions(sessionsSelector: string | number, query?: Record<string, any>, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  deleteSessionsSubscriptions(sessionsSelector: string | number, subscriptionsSelector: string | number, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getSessionsSubscriptions(sessionsSelector: string | number, subscriptionsSelector: string | number, query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
}

export interface AuthHttpSugar {
  postAccountConfirm(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postAccountRegister(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCallback(options?: AxiosRequestConfig): Promise<AxiosResponse>
  getCallbackProxy(query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postEmailConfirm(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postEmailRevert(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  putEmailUpdate(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getInfo(options?: AxiosRequestConfig): Promise<AxiosResponse>
  postLoginCredentials(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postLoginPasswordless(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postLoginPasswordlessConfirm(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getOauthLink(query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getOauthLogin(query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getOauthProviders(options?: AxiosRequestConfig): Promise<AxiosResponse>
  putPassword(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getRegions(options?: AxiosRequestConfig): Promise<AxiosResponse>
}

export interface AiHttpSugar {
  getLogs(query?: Record<string, any>, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postLogsCalculate(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getMcpDevelop(options?: AxiosRequestConfig): Promise<AxiosResponse>
  postMcpDevelop(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  getMcpSupport(options?: AxiosRequestConfig): Promise<AxiosResponse>
  postMcpSupport(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postToolsGeneratePvmCode(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postToolsGetApiSchema(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postToolsSearchApiMethods(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postToolsSearchDeviceDocumentation(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  postToolsSearchFlespiDocumentation(data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
}
