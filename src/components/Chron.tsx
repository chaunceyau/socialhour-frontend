import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { client } from '../client';
import { gql } from 'apollo-boost';

export interface IChronProps {
}

export default class Chron extends React.Component<IChronProps> {
    render() {
        return (
            <div>
                <Button content='click me'
                    onClick={() => influencers.map(influencer =>
                        client.mutate({
                            mutation: MUTATION_CREATE_INFLUENCER,
                            variables: {
                                name: influencer.name,
                                avatar_url: influencer.avatar_url,
                                title: influencer.title,
                                verified: true
                            }
                        }, `{ id }`)
                            .then((data: any) => {
                                console.log('data1', data)
                                // AFTER ADDING, WE NEED TO ADD SEARCH TERM VERSION
                                client.mutate({
                                    mutation: MUTATION_CREATE_SEARCH_INFLUENCER,
                                    variables: {
                                        name: influencer.name.toLowerCase(),
                                        influencerID: data.data.createInfluencer.id
                                    }
                                })
                                    .then((data: any) => {
                                        console.log('data2', data)
                                    })
                                    .catch((err: any) => {
                                        console.log(err)
                                    })
                            })
                            .catch((err: any) => {
                                console.log(err)
                            })
                    )}
                />
            </div>
        );
    }
}

const MUTATION_CREATE_INFLUENCER = gql`
    mutation ($name: String!, $avatar_url: String!, $title: String!) {
        createInfluencer(data:{
            name: $name
            avatar_url: $avatar_url
            title: $title,
            verified: true
        }) {
            id
        }
    }
`

const MUTATION_CREATE_SEARCH_INFLUENCER = gql`
    mutation Q($name:String!, $influencerID: ID!) {
        createSearchInfluencer(data:{ 
            name: $name,
            influencer: {
                connect: {
                    id: $influencerID
                }
            }
        }) {
            id
        }
    }
`

const influencers = [
    {
        id: "cjy2dxjy60061097762tx66mt",
        name: "Nickmercs",
        title: "Video Game Streamer",
        avatar_url: "https://thegamedial.com/wp-content/uploads/2019/02/Nick-Mercs_800x800.jpg"
    },
    {
        id: "cjy2ea08y00c80977bb9evij8",
        name: "SypherPK",
        title: "Video Game Streamer",
        avatar_url: "https://pbs.twimg.com/profile_images/1141166573320888320/bIEjMSpR_400x400.jpg"
    },
    {
        id: "cjy9cibk803x107777xp2mmqx",
        name: "CourageJD",
        title: "Video Game Streamer",
        avatar_url: "https://www.esportspedia.com/streamers/thumb.php?f=CouRageJD.jpg&width=300"
    },
    {
        id: "cjy9ckecf03xs0777ov7w5bmz",
        name: "Symfuhny",
        title: "Video Game Streamer",
        avatar_url: "https://yt3.ggpht.com/a/AGF-l7--bjj3zcqOzOkYkuqYsrItdmRpz-WBieWyiw=s900-mo-c-c0xffffffff-rj-k-no"
    },
    {
        id: "cjy9cl5mi03xy0777v7smjl3e",
        name: "BrookeAB",
        title: "Video Game Streamer",
        avatar_url: "https://pbs.twimg.com/profile_images/1126007365185048576/E8g6E3_I_400x400.jpg"
    },
    {
        id: "cjy9clikc03y30777gig4y5vf",
        name: "Loeya",
        title: "Video Game Streamer",
        avatar_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/89ab44ce-f2fa-4d5a-bd16-ca717d9fc125-profile_image-300x300.png"
    },
    {
        id: "cjy9cqjtz03y807776e5r30qs",
        name: "Tfue",
        title: "Video Game Streamer",
        avatar_url: "https://pbs.twimg.com/profile_images/1018202331723096064/mz-Kslw6_400x400.jpg"
    },
    {
        id: "cjy9cs5p703yw0777q72vy7x5",
        name: "Ninja",
        title: "Video Game Streamer",
        avatar_url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExMVFhUXFRUXFhgXFRUXFRUXFxcWFxYXFRcYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lICUtLSstLS0tLSstLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tN//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYBBwj/xABGEAABAwIEAgcDBwkHBQEAAAABAAIRAwQFEiExQVEGEyJhcYGRMqGxFEJScsHR8BUjM2KCkpOywgdTVHOD0uEWJDRj8aL/xAAaAQACAwEBAAAAAAAAAAAAAAACAwABBAUG/8QAJxEAAgICAgICAgIDAQAAAAAAAAECEQMhEjEEQRMiMlEzcRRhkQX/2gAMAwEAAhEDEQA/APHCVoa+AUKcCpdtY4ta6DScdHDTZ3is87YrYXdkK1/QplmdpoMLm5i2QGvPtDUawnloGjCrX/HN/gu/3Lv5Ltf8a3+E7/ctBd4PZAtHVU2kvAMXknQEkGT2ZyxPf4Kx+QLUgObah4L2sll05wBcQBMO03HqiTIZf8lWv+Nb/Cd/uXPyVa/41v8ACd/uWmuuj1rBa2g1r5DRF0S4OJAAyk678lYpdHrNzq1P5KQ6k3M49e+BpIiTqfJGlZdGLxXCm0mU6jKoqtqZoIYW+zvuShzGStXjdu0WlrA41f5lmqjITFGgqIHNSATnFdZuqZaRPb28/euPp9vRabD8CdUphzIMiYkHXkU1+B1NHxPhw7iNwVOLoJTh1ZHhNudArmIPh4g7AbcE+mRTaZ9og+IVBrST4p+GG7Byz1RLWrFyaGqWlQ1jSeXFTlu0NMbToPiVo6M7mv2R20g6IjQYUrWgCM4GgmRxBVj5exph7QGni3hykIJKwVninRx1OQu06SsVmtaMzXAt79x394UtBoOyS20jQpxkRspFQ3jeyQirKaZd22ZpSnIZRha9PVdpWxRq5w4McJ4q02i0DgicgKM5XpxoqzXFp0Re5oAnRD6tqQUSAY3rSVouj+K5ew7bhHBZ0UzyU9J8KSSaInRs/lbea6sf8qKSX8aC5mJdstRjGJVLe6ZVp5c3yemO0JEGZ0lZd2yO9Lv0zP8AIpf1LPWwSZ/TC5JaSKMtJI/NcwRrrroSnO6Y3Zy60xldmgU4BMQM2uvu2WeClojVMjFFpBfDrx/XfKDGfP1m2maZ25I67G6s1nAtmsIqHLwgjs8tCVmmzwRC3ZLZWmKQYTxYTaW3+r/MsxVorYXtL/tbb/U/mQq8tRlzckCCozVRic1ivOpAxKuU7VkDXxQNBKJb6I4iaTwD7J0I4SeK2PZewPIh41kGJGxb3jgslbUGsl28aDxP/ElaaxqF1JhA9knZ0AkaCdNtRp3J2LaoxeVp2huJ4c1wz9wg/Z+PDks7bNk+RPqYHwR3EMRhr2OOWRA7TYGwPDl8EFtrhktEgaCXbjfiPs8FopoyLI30EvkYALyDIa7NrqTplM9xBQo3GZjg/Vp37uII7wUWs8RJZWdHZJa0E8GST66+9Zu8JyPIEAuDQO7TN/KfVVKVokU7tlvo3fubnY7UQQ2BrtoQOC5cXDgWOe2eBhuun60E9/mrmA0mktLWnnUcPZjQBgA4ae4+RnFLbrDna0kDZonKJ4kiY0hDBemXOVbRnbO8d1mUyG5vEEEwd1q8GpGADBdqR3iVmMQs7mmZYymRx0JcO/2vjCk6PdI3iq1tYAOadNIEHx2ROKboXylVo2lvBZPJ0e5SVqMeXxVexgOqncPc17fhC5cVAT23HUwAJk+Q1cUmWKnsOPlOSKN0xrnROv45KhXtS0xwR6jTaB2WR3mJ9B96bdU3uHzI7wfiClSVdGvFltb2AmW2yuMwocQrtlQ11iUTdakhLlNo0LYFbhDVWucFEwAtBRpkKdtBV8jJRlv+m3cgktfkXVPkZVI+enbFHel36Zn+RS+1A3bLXY5gtWs9j6Zp5eqpt1eAZAM6eaD2UZNSMRcdFrj/ANX8QfcpGdFrjnS/iBMTQSKVMq/b1YCtUOi9xzp/xArLejFxzp/xAmqSDCFyZtbb/U/mQbEA4AgHhJ8JhG76gadG3pvgkGpMGYkyDPmqV9TboeYLZ8dlIvQtyp0ZsuMqagdVJUo7BWqVvAnzS5dmhPVhOxoghoOw1jmT+B70fZUbTbGgAGvnr8IQC1uW02Znb8PH5x8tB5lCMQxouJM/j7kcrUdHNnJzlsk6T4mHnINmt1PHMZj4SgNvWJIEqGrUJBPf/wDErZ8HaYBP47kCm/YXGkap12BSawTA1dHHkO6SPcorfDa1YsGXIwu7MmC+TwB1PDXuVjolhrqpFR0ZZ0JEtaY1d3u4AfctxhVAZ8zWbNMPJknTRznEe4aeKam6EN0Uepo2zA0UzVeNmzDAebuLuKoVb66doMlNvJoIA8SZ+CNXoZSZnLQddC7MZJ4gbu8/dxAX2KZoaabtTsBMD6ocAOfFaU1+jNtslq4P1gH50hx4hlQCeYPBDrrCH0zJqsfzDm7+ux7wrYu26tY10cdXZRzAOo9FWrMa4ZW5vqudPpofemR32LcnF0gzhl8zLEjMB7JcDOnzT96iuqwZDs8ueQ08CAT7I8PvWTvsJrB0sbU09AddnDgtHgtVtUhtUAVWwWF0DPEaE85HuV3vaBnjSVxdmpYyGgbGOfhK49iB41iTgQBIcNfMHY9xBcPRFLHFGZRxe4TrrA38gARqVmzYn2avFypFm3ZDkTYFTsKgeM42OyuSufLs6alas4WroC5K4HKkiNj0k3MuIqBs+fISyDkE8NRfBMNa/NVqmKNOC7m4nZg8fxujGUU8NwarW/R05A3cYDB+0fslER0fpDR93QB5Dte+QosTxSpV7I7FIaNpt0aBwmNyqTaZ0MGOGnwV0y0jTW3Rols0alKtG4a4B3ofvUIsiDlc0gjcEQQhtpWezaQdOYPcVrMLxEXUUaxAqR+bqcSfoP5yjvQYJqMygRpJhPa7sZSQJIifFcvQ5jixw1Bg+SjqkOpn6TTPiNipLqzNlW7IqtEhw0UtzUhg01JHpKsUmh2szGo726aHvEH3IZ0gu4IA4sMeOZu3oUNp7CWW40UccvpeGt2a2D4zJVG0pmoeJ+/U/Yqj3Ekk7mSVtOhmHTSLo7TqjDr9Bpk+pEftIOdsW9AeywapU6qm1pLqku4wQSWtAjlkcTw1XomFdAGMYG1DDj7ccP1RzP3+AR/CrOlRaaobs1rKfc0DQN8Sd+JKa+6eauUDaPDMdZMcuHeEEpURLlofRw+k2KTWZaTR2uQH0ZG54k8fiVt2MFPMWzJ7DBy4D7T96QptLYiW7E7A84hQve2k0HKTr2KbZLj3vM6eZUjkbdAuH6K7sEdVd1lbf5o+a0cIHFVbjBqM6lo5nMB5DkO/8ArTtLu4EOPUsO4ae0Rxl3DyhGcO6OW9EANYCd8zu04nnJT/AJ+K7F/43J7MRd2tptnbI0AnKJ/VmB71SFhSB/R+BzNIHhBXqj7dm2UegVathdF2mQDw7PwRQ8xrsDJ4EWtPZ5dc2Y+g5/7JPDggtxaAfNI10BAMd41MeS9ZrdGqfzHOb55v5pQbEOixiB2vrcfGFqj5UJdmP/Dyw62YGnd06gyVpHAVBrHc/iVQxCk6nqDM6At1BB/Gyd0vwy4tdXUm9WT7VPMI7jqgGH4sZymcpmQdvLkmfNG6GR8dra/4eqdHHD5PTA4Ng+XNEyVkOjGJta0MnidDE7yJ9TqtU18rn5sbjJm7DkuNeyRdaJTApWJaQbkd6vvSXcySKgOZ4JkR7GB1dC3oDTsda/vc/b01Hoo7vDIOmyIdKbU56T+DqFOPKfvCtrZtozgYrFvUe32XEaObw2cQSPUBOpgCQRMiBwgyDI9PeVfZcsmepb7QdHAAAS3bYwfXioWkVC1zzLt4AnwEBXaFHLqNCNfCFNSuWaTSboHCeckEE6cII81Bd3YYNswIP471C20kGsZc2r1Vb+9p9qPpN0JHuQVwjw1gj3ghVsYr5be0aCWmKjgeQLtJ8QVTo3NR3fO+2U94PAquaqjJN2XaN5lJB24dx4hDcVfnd3CSPA6p97UZGuruOXb1KoW7CSRz+H3JDZcUdtLQvc0Ddzh6LfYS0MeaYBMNa2OMODT67lZzo/aEVnO4MB9ToPPUei2GE0ZuOtcOG+0O1knugE+YQuVAyDNTEZNOmNg4keDSMvxJVm0uoDjsSdydgeCo1MucOGvZbH7XacfQgeav2lt1mXgPaPnshlL2xuLEGbJ5fo32RueJPdyRyxtWt7W55nVD7JgAAAgItQS1NtmhwUVotArock1icAExC2cJXE4hNhEUzhUblKUx4VoWwJjlgyrTcxzQQQQvn7pJg77WsWzpJLe4cl9G3bdF5/07woVaJcPbZLh38x6LZi2qYma4uzz3A7jUmfxOo/HJb7o9cl1MNJmBp3akEeRB9F5pZ1u1pExtx08d16P0epltMTvOp5k6n3kjyWnJTx0zLxrJaDgKkaoGlSsKyqI6UiRJKUkXEDkYTqZGqItshXtwwfpKMlo4uYdwPDT0CpsJIhSU3vYczDDhsUFWdR6M/fWYaVBQpsg5s0y2I5SM3nE+5bC56i5bLiKNXiY/NuPP9X8boW/o1W+bkcObXiPeoyJ2CaGWdtOE7ovY4Q2u4MyDLu4x7LeJngn0cDDNa1VjByBzPPgAiYvGFnU0AWs+cT7T/HkO5Kb/AEE9oxvS2iDWln6MAU2DkANPVA85bpGXnDdfVaHpVbiC7PBGkGRP1eHoszTrDSTtGuu3/CuUdGWXZNTpmpmg6ASe7RXMFt81Qjk34mPtCsWlNtOkSd3SefDSQmYNcAVzO2WZ82k+5Zm7LukaGoG29OrUMR1unfmJj8eCk/KTX9hvzsrTwluUTr3wfVZvpDjHXOyDRjTJjY8I79yrnRyk5zgfx3e6FF9UBFc5bNtg9qXlznbk7cGtGgA9FqaLAEIwmnlEIlVqwJlZJybZ04xSRYr4nTpCXEzwaASfONh4obU6R3bp6qk0N2B1J8+XhC7Tot9omSeev/xMfizGv6umx1R5E5WiT4u4NHeYCdihYMmCsR6XYhTH6OeB7JP2oEf7QbwnRxbG43g90iVpsUxIt/SfJ2k6ZDWBcNQO1kBA1PPTVZHGGND+1TDQTDXtLX0nE8nt08jC3RgqsRe6NhgHTioMgr6y4Ce52x8Fv7W+a/Y/jj8CvCspaRPDbiAvRehr3O1OugE8zxKF8WSWN9m7C4Qo5Iastj3ScUXATrxHhr9iqEHLozSfHs01emCFksfow1wOxBWXuf7TXAyNydZ9kA7CBqOHeURseltC9pupkhtSNBwd3tlaceOUXsVklaPLKNo83Rp7DMYJ4DeZ7h8F6Vh9DQAeyBqeJ7h3eCy9Ng6zVoJzEE9wPGdFsrKqCNBp4QtWSDSMiycmWsifTEJocu50lRCciWUlDnSRcQLMkxFqeH0yAflFMSNoP3oaymtBe4I2mwvDiYbTMQNc5IPpCzN0dmTKH5Hpmf8AuKfofvUVTAKJ2uafofvV9tmPk/WyZz5I4REyn2OBioxr87gXOeDAEDKHER+6PVTv2A3QJb0cpja5p+n/ACr9HB6bR/5FP0P3qnaW+ZzQT7RA9Srd/YinVNMEkAgTxMx96px/2XzYLxnD8sZK7XgzLIER4md5hYjFcLyEucAOMSNp1+5emdIMFbTe1gc46ZgdiDJHDwWG6VNAy0QTLu089w2nnqr1xFSAVauXujbsyBzn7dFTu6Tmb8+Hf+ApwQ17Sduz9kq/cAVGSdiST8APDX3LG3TIlZFhGH9c1x22Hk0NBIPivQujWFNZrGoA9VkcAvAPzYEaQPM/8L0PCycqzzk9mjBH7BCm3XRWBSkbLlq3VF7WglLbNcnQFrW4Ijbw1PkOazVbB7l9TqKbupok5qjmuBrVDHznfiNl6N8hG8KvUwUk5mOg+C0wbQpyR5R0l6C1W9aaNuaktYGnOJZGUuec2riYcDt7Smw/o1Vt6PW5Hub1hbUokF2akWtOYQBqDIMRPkvUDh9yOLCFaoW9XTMQPBbo5NWZHCn3ZhG9Gg+m2pQOamdRJkj9UnmFpej9p1YGkI/VBAjnuq7KYCw5pNyNUH9Qk4y3yXiPS60qm4qgmIcd+XCPKF7XQdIhZzpXgpqup1KdOm585T1jiGAanMQB2iOXet3iZVF79nP8rE5bieFPtGg9omB84tOUecR6q9QwJrm5mVCfD46eSK9MLq+tqgp/KKUF72hrabWDsNY6TJJg5oHOEGw+/wC2HZAx5/SNbAY6dqjRwPMAazK3wnFuqMslPjaZbwwvDyxxJy6yd9+Ouv3LXYXeFwERl2EfjRALeybVrhzmgsAAeIEnMdPfE9y2VOmGiAAB3CEyetGft2SArjimyuZkui2x0pJmZJSgbBGRa7HB+Yd9Sj7nH71mCtZjH/ju/wBP+k/audL0dtvYKY2bL/W/pRfBaP5hn1n/AAeg3WRZn/O/pCNdH3zQb/qfEj7VH0UzOWdPts+s34hXcVpTdH6zP6VDaNOdunzm/EIhfsm6/bZ/SpeyC6VU+20/qn3OK8qxa0L7otB4au4MbxJ5kAk+YC9b6QtlzPB/85WLubEVTctb9BjJ+u7tfA+irlUCRjykkD8IxjChUFCpRa5p7PW1KbXCTzLtQO8aIli/QtlPM6ifzWXM0STlJ4AnhyVCj0DDrYkSahkwPcAtJ0YrvbZtp1pD6c03A79kwJ8oWOWumbOHqjzalZZXio0xB18dD8F6ThtyHNBH41WUqYS9tR72QWE7HiJkeBCI4Sx7Dro2NuSGeyQhxZsbNyO2T1lcPrStBaVEpaYU0H6alaFRoVFdY5aUzLJHXLkJ8JqYAVboKhUqQpsVuQIE+KoVb+m0S5wAHNZ57ZpgnQRtaisO1WQuOllFp7LgUTodMLYtBzDwKdhUnpIDMqVgbpVbW9QllZgD47L9j3QR8CvNMTwqLgOa4ZcoaAJ0DeBPFetddRvjWZlBDAyD3uzTHoFjcSwU0SRuNYK7GCvxl2cbPOvslo5gFuRLjsWx5yfshGVFbUg1oAHAeqkTZO2Zo6QiUwuTio3KkC2dzJJiSugbIYHBajFv/HqDvpfysWXqN5I3d4hTfTqMBMuNOND81rQfgVzpLo7tlN7v+yP+d/SEZ6OO/NM+rW/magjnD5MaXzuszbaREbohhF41jGAzoKoOn0i0t+CGS0WTdG93/U+0Ke5YDdfts/pVXArhtMnPMFsSBPJWvlLTX6zXLmB21gRwS92U2Px4Caccc/8ANqszhz29ddMHA0gPEtP2laXEqrXtbG4Lz+86QspbDqbus5/su6mp5NdlefKQUM/wYzC/uix0srvp0TSouIdESN/VZroLbVialKoT2e27Me0S7bfwXojsPpOqZnxG47/BZrFHNtLptSOxV7BPKdlntcaN9WytRdDi3kSFOKcqsP0jxycfvCv2o1S2QdaMIKPWtTQIZTYrNIwlsoP21ZEqL0AtnorRq6JuNiZoJhyjqHkomVV11YBaEIrZmulVtWNPNRGZ7TOWYLhxAnSV5Dj9ve3FQNdTrsbxlpEnyXvT6oMpptwfmg+KXCDTHvJ9aZ83VcDew/OkHbUFU8Q66mQHSC4THcvaek2GONWWM8dFl7/DGdc11VoLgI1ExJ0P/wBXWxYE42ns5Wfy3F8a0av+ymxqttDVqgh1UtLZEHK0GDHeXH0RzHKALTIVro7Vmi0E6gQo8bPZPglW/kJ9XjMyuOSJTHOW5I5jZwlRkrrioyUSQDY6UkyUlZQ3covb/J/7t0j9dC2hWabJXPkd1BNvyf8Au3fvKVvU/wB0795V7cgcJ247c1YY5v0eB4/j8FIYVj6Yof3bv3lYa6j9B37yh61o+aNxx5bjzULnqqsFskuqjNMrSOcmVmem+enSZdUxLqLpcODqTtKjT3bHyR46qO5oh7XMcJa4FpHcRBRqNg83F2jP4J0jtKuTI8tP0XGQ08hPBbbqi9sdlw7wD6L5yxaxfb130jILHGO8fNPpCJ4d01vaIAbVLgODtVkyYaejdHyU+z0DFPzNw5h4gFWrCpJ5rz6t0pqXDw+pAcBGnELWYLeDRLlBpD4zUujY02yE5gVehX0S67VIoIJUSiNE6IHQuETtqyOAEkSX13kEl0ADwCzv/WFEvydYN+a13yZj9HAEciJQOv0Ew4Eu+TMk6kguHwK12lEUqvZVr9NbWmPazHu28yqT/wC0akXRmaPDVHLXohYN2taJ49pgcf8A9SrFfo9ZkQbajHLqmR8EeNxXZbcQLa9Ord3tHlv3p2JXFtdMLRlDiOyQRqm33QXD6m1IMP8A63OZ7gYWB6U9HauHkVqVR76M6z7dPXQkjdq2YuF30YfISkqR6D0bvyymWkS5ukTv5qfG7zseKxeC43nLSDJMT48UaxWsSWt5kJ7xfezB8jWNo4XJpK64phcnmERTSUpSKso4kkkoQsjRaDD65NLshuZnMAy3/hDhbhXrOWEEcPeOK48pWd8np3r+Tf3VI27qfRb+75JtzRyuzN9l2rfuUYe7mePv3QlNj6t1UjRrf3Oey7ZXFVxDYZr+r71GSeZ4D02VimOrZPzn7dzeaICyPEKgc6BEDTTjzKq9WpYXCmIBs84/tTwIkNu2D2Rlqx9H5rvKSD4rzSNV9G16TXNLXCWuBBB2IOhC8Ex/CzbXL6JmAeyebT7J9FU46sLHK9FJnZI70ewTE8pglOxfBstux43AErO03pDqSNivGz13DL+W7yr7a8ryzD8Xc2BOi0+G4+DElZpY2jVGSZtGSiNnVOiB2N81w3RShWCS3QdGptKmitESg9hcBFqVQFOhK0IlGmRdSeCo3rnid/RGwQuuC0QkkLbsxNDEXlxaRsd+YUOMXrXUyxwBzAgg6ggjktfXtWn5rfQIDiuGtOoGy2Ypxb2jHnjKtMzuC9H6VFuYCOMcBxUHXB9YkbNn12+9W8cvuqZlB1IQ3CWdjN9Iz5DZboJ9s5udpKkXnqIpFybKMzC2TwU0hcKhQ9JR5klCBNmIHlqrdnfE+0PNA6TpWhs6MN1iVzMkUjuWF7Mh7Szzb48lXIUdE5duCtXmoFQbHRw5OSUU2NtaWY6+yNXeCjuquZxPp3Dgprh2Rop8Tq77AqRciirAkzsrhKaXJpcmpC2xxK8x/tVofn7d0btcCeerSB7yvSHPWd6X2FOtRc5w7VMFzTyjUo+OmVCVSQOpW3WW+X9VebYnaGm8jvXrWBU5pDwWW6X4VrmhczHLbR2csbRhAU5lUjYp1akQUyE+jNtBjD8ecyAVprHpM0/OXn7mpApcsaY2OeUez2DDek7SY9AdPAytPZ4wCJDh67xqvn1l08fOKKWXSGqz5xj4Jfw10MWeL7PoKzxhriRPJXGYi3aV4Rb9L3tMyT+OSKN6baDXxWjFjsXkmkj2U3reYKD4jiTBOq86b0v+idx+PNUrrGi/Un8a7LoY/GXbZzsuZ+kFMZr9bVAHHQIqGhoDRwEIZg1sY614gkdkHcDn5oi5y2daRy5u2NKSSaSoAPBTXFNlKVCjiSUpKEO2z1o6F6C3v5LIsqwjNJrKtMGnpUaO0yfbH0m96wzx2dpyC1O4M67K3ZYgGEzqDrHeNll6N1Ok8/cJj3IoAZiRtO8jj9yF4kLci1UuZJJ3KjNyFA9hgmRsDvzTLa3dUdlb5ngBzKOONVsW5MnddhROu02+NOQ2mNGiC76R5+CqJkYKhUpE7rgqli9T8xV+o74KZVMV/Q1PqO+CKSSiyoNua/ssdHB+bHKFYxnDhUYVBgHsN8AtAGZgvOXUj09aPGcZwotOyAVKZBXs2MYSHg6LG32AjktUcqYiWOzElqjcFqquBmJAkFCLvDiOCYqYmUKBa4pqlEhQkKmhbQl2SuK1bWT37DTmjhBydIBuhtq17nBrASSYAC3uA9HBSh9Y537gbtaftPuQ/ArFtMg8SRr5rWgrp4cHBbOd5Od9RJsyRCjzJZ08xDiE0rmZJQoQC6QuSuSoWKEkklCAjrVJb3DmuDmkgjYhUmFWqDUOjopmjZTFwOsYAKo9tnB/6ze9Ki7RB7e4cxwLTBB0K09qBc9psNqaZxwP64SWuP8ARJb6IbW2dUdlb5ngBzKs3Vy0N6ql7PzncXn7l27rgN6ql7PzncXn7lSDVEr2xTddDYTSpCE2EYpsYqWMGKFT6sepA+1EED6VXMMZSG7ntJ8Br8Y9EGaXGDY3x4ueWKX7C+BiGjwWipLO4KdAtHRK80+z07IblkzPkfsQWvQEwQjly7RCazwd9+fL/hWiJDW2TSNQhmK4A1wlo1Rei8ga6+Cs0bgHRNhJpgTimeYYjhETog35Fe49kL2HEMIY7tcVUFgxg0C6+DEpK5HG8rO8bpI8+s+jgZq8SVeFuBpCO3wA2QzL6LowjGK0jCssp7ZHTEEeI+KOAoORt4hFgrYrJsklJNCSEWOlLMmkppKsg8uXJTJXVCWOlJMXVZQCpK9bJJJR0I9D6e581tOh3sP+sP5UkkvL+JcfyIcQ/Sv+sVXKSSi9CH2cKaUkkQDOBZTpL+mZ+z9q4ks/l/xm3/zv5jUYL7A8Eet9h+OCSS8/Ls9AyO62CDV9/RJJWiyajsfJKl7QSSTYi5BpvsITdeyfFJJdvxukcHzu2Zm8VNq4ktyMMOh9Th5fFEwkkoyTHJJJIQDhTCkkrKOhIrqSso4kkkoQ/9k="
    },
    {
        id: "cjy9ctmdf03z20777xrd7rn84",
        name: "Timthetatman",
        title: "Video Game Streamer",
        avatar_url: "https://www.thenetworthglory.com/wp-content/uploads/2018/06/timthetatman.jpg"
    },
    {
        id: "cjy9cz5i203zd0777y177688d",
        name: "Shroud",
        title: "Video Game Streamer",
        avatar_url: "https://static.hltv.org/images/playerprofile/thumb/8349/800.jpeg?v=5"
    },
    {
        id: "cjyf81d3m0alg0777r53oqhj9",
        name: "Nick Eh 30",
        title: "Video Game Streamer",
        avatar_url: "https://pbs.twimg.com/profile_images/1101608329976168448/iLX6Yv33.png"
    },
    {
        id: "cjyf872mr0amg0777km5d5g65",
        name: "Dr Lupo",
        title: "Video Game Streamer",
        avatar_url: "https://bookingagentinfo.com/wp-content/uploads/2019/07/Ben-DrLupo-Lupo-Contact-Information.jpg"
    },
    {
        id: "cjyf88v060amr0777m4kwlvix",
        name: "Nate Hill",
        title: "Video Game Streamer",
        avatar_url: "https://pbs.twimg.com/profile_images/1140689807749853185/k_cNL3xG_400x400.jpg"
    },
    {
        id: "cjyf89srz0an60777149qdo7m",
        name: "ChicaLive",
        title: "Video Game Streamer",
        avatar_url: "https://pbs.twimg.com/profile_images/1144683185953021953/2f-QGKVQ_400x400.jpg"
    },
    {
        id: "cjyf8ahp00anh0777u5x32uti",
        name: "Sommerset",
        title: "Video Game Streamer",
        avatar_url: "https://pbs.twimg.com/profile_images/1136374459776897024/kMb2mm06_400x400.jpg"
    },
    {
        id: "cjyf8c51f0ans0777bgckmbfg",
        name: "EG MoNsTcR",
        title: "Video Game Streamer",
        avatar_url: "https://pbs.twimg.com/profile_images/1138042233322688512/MtyYVU51_400x400.jpg"
    },
    {
        id: "cjyf8fo760ao30777vindbqdf",
        name: "Pokimane",
        title: "Video Game Streamer",
        avatar_url: "https://pbs.twimg.com/profile_images/1113134455374221313/0SVG8TQn.jpg"
    },
    {
        id: "cjyf8gg0j0aoe07777n1s758f",
        name: "Disguised Toast",
        title: "Video Game Streamer",
        avatar_url: "https://shortyawards.imgix.net/entries/11th/842c532c-8a99-431f-845b-5c2f40db2232.jpeg?auto=format&fit=crop&h=400&q=65&w=400&s=b98b8b1a53d17ae5781f665fa00de224"
    },
    {
        id: "cjyf8gxrz0aop0777rggg0if0",
        name: "HighDistortion",
        title: "Video Game Streamer",
        avatar_url: "https://bestplayersettings.com/wp-content/uploads/sites/3/2019/03/HighDistorsion.jpg"
    },
    {
        id: "cjyf8hpgx0ap007774v73xund",
        name: "Jukes",
        title: "Video Game Streamer",
        avatar_url: "https://www.esportspedia.com/lol/images/9/98/Jukes_C9a.png"
    },
    {
        id: "cjyf8ih8r0apb0777f06ayext",
        name: "Ghost Aydan",
        title: "Video Game Streamer",
        avatar_url: "https://pbs.twimg.com/profile_images/1120191602608095232/vGhuSxol_400x400.jpg"
    },
    {
        id: "cjyf8kh180app0777cleoco6o",
        name: "Jordan Fisher",
        title: "Video Game Streamer",
        avatar_url: "https://pbs.twimg.com/profile_images/1104631244443119616/sZ_jZ7Zd_400x400.jpg"
    },
    {
        id: "cjyf8mwue0aq80777mmqgq223",
        name: "Corinna Kopf",
        title: "Influencer",
        avatar_url: "https://pbs.twimg.com/profile_images/944084386047283200/7mkPBdMg_400x400.jpg"
    },
    {
        id: "cjyfvetv20az90777sae3bthx",
        name: "Dakotaz",
        title: "Video Game Streamer",
        avatar_url: "https://fortsettings.com/wp-content/uploads/2019/01/dakotaz.png"
    },
    {
        id: "cjyfvfebw0azk0777f8pobkf3",
        name: "Loserfruit",
        title: "Video Game Streamer",
        avatar_url: "https://pbs.twimg.com/profile_images/1086071522542768128/_YHwKsAj.jpg"
    },
    {
        id: "cjyfvg9v20azv07775cfp8d4q",
        name: "Alison Wonderland",
        title: "Musician",
        avatar_url: "https://pbs.twimg.com/profile_images/905389052018307073/zIj4oNVV_400x400.jpg"
    },
    {
        id: "cjyfvh9uu0b0607773upk8kcl",
        name: "Fearitself",
        title: "Video Game Streamer",
        avatar_url: "https://pbs.twimg.com/profile_images/963542672324677638/f7WQ2F7J_400x400.jpg"
    },
    {
        id: "cjyfvihb80b0l0777yx19nn3v",
        name: "Cody Walker",
        title: "Actor",
        avatar_url: "https://ecelebrityfacts.com/images/1747/cody-walker-1747-3824-1464332878.jpg"
    },
    {
        id: "cjyfvj90v0b0w0777ukhxb1h9",
        name: "Wearelostkings",
        title: "Music Group",
        avatar_url: "https://pbs.twimg.com/profile_images/1080903170468052992/H6TvFyyB_400x400.jpg"
    },
    {
        id: "cjyfzja240b3q07778xizae8u",
        name: "TSM Daequan",
        title: "Video Game Streamer",
        avatar_url: "https://shortyawards.imgix.net/entries/11th/f0731817-b23a-47ea-b98e-6b95868c023d.jpeg?auto=format&fit=crop&h=400&q=65&w=400&s=04d3f8bcdc4e7d13f140c3d224c71497"
    },
    {
        id: "cjyfzkb6u0b410777691dxbh0",
        name: "TSM Myth",
        title: "Video Game Streamer",
        avatar_url: "https://proconfig.fr/wp-content/uploads/2018/10/TSM_Myth.jpg"
    },
    {
        id: "cjygniy5u0cta0777b6lajcwe",
        name: "Gary Vaynerchuk",
        title: "Entrepreneur",
        avatar_url: "https://specials-images.forbesimg.com/imageserve/5a3407f64bbe6f192f088338/416x416.jpg?background=000000&cropX1=205&cropX2=1569&cropY1=130&cropY2=1494"
    }
]