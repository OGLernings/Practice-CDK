import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as lex from 'aws-cdk-lib/aws-lex';
import { Construct } from 'constructs';

export class LexbotStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    

    const myLexBot = new lex.CfnBot(this, 'MyLexBot', {
      name: 'myBot1998',
      roleArn: 'arn:aws:iam::862165548342:role/service-role/practiceLexBotCreation-role-mwp8nli7',
      dataPrivacy: {
        // The DataPrivacy property must be present.
        // It should not contain the `childDirected` key.
        ChildDirected: false
      },
      idleSessionTtlInSeconds: 300,
     
      
      botLocales: [{
        localeId: 'en_US',
        description: 'English (US) locale',
        nluConfidenceThreshold: 0.8,
        voiceSettings: {
          voiceId: 'Joanna'
        },
        slotTypes: [
          {
             
          
            name:"User_ID",
            parentSlotTypeSignature:"AMAZON.AlphaNumeric",
            valueSelectionSetting:{
              resolutionStrategy:"ORIGINAL_VALUE",
              regexFilter:{
                 "pattern":"[A-Za-z0-9]{2,12}"
              }
           }
          }
        ],
        
        "intents":[
            {
                
                "name": "Helpdesk",
                "sampleUtterances": [
                    {
                        "utterance": "Can i speak to helpdesk"
                    },
                    {
                        "utterance": "helpdesk"
                    },
                    {
                        "utterance": "help"
                    },
                    {
                        "utterance": "3"
                    },
                    {
                        "utterance": "three"
                    }
                ],
                "intentConfirmationSetting": {
                    "isActive": true,
                    "promptSpecification": {
                        "messageGroupsList": [
                            {
                                "message": {
                                    "plainTextMessage": {
                                        "value": "Can you please confirm with yes or no?"
                                    }
                                }
                            }
                            ],
                        "maxRetries":3
                    },
                    "failureNextStep": {
                        
                        "dialogAction": {
                            "type": "ElicitSlot",
                            "slotToElicit": "User_ID",
                        }
                     },
                    "confirmationNextStep": {
                        "dialogAction": {
                            "type": "EndConversation",
                        }
                    },
                    "declinationNextStep": {
                        "dialogAction": {
                            "type": "ElicitSlot",
                            "slotToElicit": "User_ID"
                        }
                    },
                },
                "intentClosingSetting": {
                    "isActive": true,
                    "nextStep": {
                        "dialogAction": {
                            "type": "ConfirmIntent"
                        }
                    },
                    "closingResponse": {
                        "messageGroupsList": [
                            {
                                "message": {
                                    "ssmlMessage": {
                                        "value": "<speak>your user ID is <say-as interpret-as=\"characters\">{User_ID}</say-as></speak>"
                                    }
                            
                                }
                            }
                        ],
                     }
                },
              
                "initialResponseSetting": {
                    "nextStep": {
                        "dialogAction": {
                            "type": "ElicitSlot",
                            "slotToElicit": "User_ID"
                        }
    
                    },
                },
                "slotPriorities": [
                    {
                        "priority": 1,
                        "slotName": "User_ID"
                    }
                ],
                'slots':[
                    
                    {
                        
                        "name": "User_ID",
                        "slotTypeName": "User_ID",
                        "obfuscationSetting": {
                            "obfuscationSettingType": "DefaultObfuscation"
                            },
                        "valueElicitationSetting": {
                            
                            "slotCaptureSetting": {
                                "captureNextStep": {
                                    "dialogAction": {
                                        "type": "CloseIntent"
                                    }
                                },
                                "failureNextStep": {
                                    "intent": {
                                        "name": "FallbackIntent"
                                    },
                                    "dialogAction": {
                                        "type": "StartIntent"
                                    }
                                }
                            },
                            "slotConstraint": "Required",
                            "promptSpecification": {
                                "messageGroupsList": [
                                    
                                    {
                                        "message": {
                                            "plainTextMessage": {
                                                "value": "Can you please say your User ID"
                                            }
                                        }
                                    }
                        ],
                        "maxRetries": 2 
                    }
                }
            }
                  ],
            },
            {
                
                
                name: 'FallbackIntent',
                parentIntentSignature: 'AMAZON.FallbackIntent',
                initialResponseSetting: {
                    initialResponse: {
                        messageGroupsList: [{
                            message: {
                                
                                plainTextMessage: {
                                    
                                    value: "I'm sorry we can't get your input. Please try again."
                                }
                            }
                        }],
                    },
                    nextStep: {
                      dialogAction: {
                        type: 'CloseIntent'
                      },
                    }
                  },
                  intentClosingSetting: {
                    isActive: true,
                    nextStep: {
                      dialogAction: {
                        type: 'ElicitIntent'
                      },
                    }
                }
            }
              ],
              
          }],
    });
    
    const cfnBotVersion = new lex.CfnBotVersion(this, 'MyCfnBotVersion', {
      botId: myLexBot.attrId,
      botVersionLocaleSpecification: [{
        
        botVersionLocaleDetails: {
          sourceBotVersion: 'DRAFT',
        },
        localeId: 'en_US'
      }],
    });
    
    cfnBotVersion.node.addDependency(myLexBot);
    
    const botAlias = new lex.CfnBotAlias(this, 'BotAlias', {
      botId: myLexBot.attrId,
      botAliasName: 'myBotAlias123',
      botVersion:cfnBotVersion.attrBotVersion,
      botAliasLocaleSettings: [
        {
          botAliasLocaleSetting: {
            enabled: true,
          },
          localeId: 'en_US',
        },
      ],

    })
    botAlias.node.addDependency(cfnBotVersion);


  }
}
