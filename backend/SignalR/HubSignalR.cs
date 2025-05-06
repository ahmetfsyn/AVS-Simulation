using Entities.Dtos;
using Microsoft.AspNetCore.SignalR;

namespace SignalR;
public class HubSignalR : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }


    public async Task ReadCard()
    {
        await Clients.All.SendAsync("ReceiveReadCard");
    }

    // public async Task SendCardInfo(WaterCardDto waterCardDto){


    //     await
    // }


}
